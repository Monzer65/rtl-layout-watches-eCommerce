"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import clientPromise from "./dbConnection";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { validatePassword } from "./helpers/validatePassword";
import { generateAccessToken, generateRefreshToken } from "./auth";
import { validateEmail } from "./helpers/validateEmail";

const generateUniqueUsername = (email: string) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  return email.split("@")[0] + "_" + randomString + "_" + timestamp;
};

export async function signup(_currentState: unknown, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm_Password");

  if (!email || !password || !confirmPassword) {
    return "لطفا تمام فیلدها را وارد کنید";
  }

  if (
    !validateEmail(email.toString()) ||
    !validatePassword(password.toString())
  ) {
    return "ایمیل یا رمز عبور را به طور صحیح وارد کنید. رمز عبور باید حداقل دارای 6 کاراکتر باشد";
  }

  if (password !== confirmPassword) {
    return "رمز عبور با تکرار آن مطابقت ندارد";
  }

  try {
    const client = await clientPromise;
    const collection = client.db("fakeData").collection("users");
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      return "کاربر قبلا ثبت نام کرده است؛ از لینک ورود استفاده کنید";
    }

    const hash = await bcrypt.hash(password.toString(), 8);

    const newUser = {
      _id: new ObjectId(),
      username: generateUniqueUsername(email.toString()),
      email,
      password: hash,
      roles: ["user"],
      refreshToken: [] as string[],
      address: "",
      createdAt: new Date(),
    };

    await collection.insertOne(newUser);

    const accessExpiry = new Date(Date.now() + 10 * 60 * 1000);
    const refreshExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const accessToken = await generateAccessToken({
      username: newUser.username,
      roles: newUser.roles,
      expires: accessExpiry,
    });

    const refreshToken = await generateRefreshToken({
      username: newUser.username,
      expires: refreshExpiry,
    });

    newUser.refreshToken.push(refreshToken);
    await collection.updateOne({ _id: newUser._id }, { $set: newUser });

    cookies().set("accessToken", accessToken, {
      expires: accessExpiry,
      httpOnly: true,
    });

    cookies().set("refreshToken", refreshToken, {
      expires: refreshExpiry,
      httpOnly: true,
    });
  } catch (error) {
    console.error("Database error:", error);
    return "خطای دیتابیس. لطفا بعدا تلاش کنید";
  }
  redirect("/blog/dashboard");
}

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return "لطفا تمام فیلدها را وارد کنید";
  }

  if (
    !validateEmail(email.toString()) ||
    !validatePassword(password.toString())
  ) {
    return "ایمیل یا رمز عبور را به طور صحیح وارد کنید. رمز عبور باید حداقل دارای 6 کاراکتر باشد";
  }

  try {
    const client = await clientPromise;
    const collection = client.db("fakeData").collection("users");
    const user = await collection.findOne({ email });

    if (!user) {
      return "کاربر یافت نشد";
    }

    const isMatchPassword = await bcrypt.compare(
      password.toString(),
      user.password
    );
    if (!isMatchPassword) {
      return "رمز عبور یا ایمیل اشتباه است";
    }

    const accessExpiry = new Date(Date.now() + 10 * 60 * 1000);
    const refreshExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const accessToken = await generateAccessToken({
      username: user.username,
      roles: user.roles,
      expires: accessExpiry,
    });

    const refreshToken = await generateRefreshToken({
      username: user.username,
      expires: refreshExpiry,
    });

    user.refreshToken = [];
    user.refreshToken.push(refreshToken);
    await collection.updateOne({ _id: user._id }, { $set: user });

    cookies().set("accessToken", accessToken, {
      expires: accessExpiry,
      httpOnly: true,
    });

    cookies().set("refreshToken", refreshToken, {
      expires: refreshExpiry,
      httpOnly: true,
    });

    console.log("Redirecting to /blog/dashboard");
  } catch (error) {
    console.error("Database error:", error);
    return "خطای دیتابیس. لطفا بعدا تلاش کنید";
  }

  redirect("/blog/dashboard");
}

export async function logout(_currentState: unknown) {
  const refreshToken = cookies().get("refreshToken")?.value;

  if (!refreshToken) {
    console.error("Refresh token not found in cookies.");
    cookies().set("accessToken", "", { expires: new Date(0) });
    redirect("/");
  }

  try {
    const client = await clientPromise;
    const collection = client.db("fakeData").collection("users");
    const user = await collection.findOne({
      refreshToken: { $in: [refreshToken] },
    });

    if (!user) {
      console.error("User not found with the provided refresh token.");
      return "User not found.";
    }
  } catch (error) {
    console.error("Database error:", error);
    return "خطای دیتابیس. لطفا بعدا تلاش کنید";
  }

  // Clear cookies
  cookies().set("accessToken", "", { expires: new Date(0) });
  cookies().set("refreshToken", "", { expires: new Date(0) });

  // Redirect user to the homepage
  redirect("/");
}

export async function createCustomer(
  _currentState: unknown,
  formData: FormData
) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const roles = formData.getAll("roles");
  const address = formData.get("address");

  const hash = bcrypt.hashSync(`${password}`, 8);

  try {
    const client = await clientPromise;
    const collection = client.db("fakeData").collection("users");

    const user = await collection.findOne({ email });

    if (user) {
      return { error: "کاربر قبلا ثبت شده است!" };
    }

    if (!email || !password) {
      return { error: "فیلدهای ایمیل و پسورد اجباری هستند" };
    }

    let rolesArray = Array.from(roles);
    if (rolesArray.includes("admin") && !rolesArray.includes("user")) {
      rolesArray.push("user");
    }

    await collection.insertOne({
      username: username
        ? username
        : generateUniqueUsername(email ? email.toString() : "User"),
      email,
      password: hash,
      address,
      roles: rolesArray.length ? rolesArray : ["user"],
      refreshToken: [],
      createdAt: new Date(),
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Customer.",
    };
  }
  revalidatePath("/admin-area/store/customers");
  redirect("/admin-area/store/customers");
}

export async function createProduct(
  _currentState: unknown,
  formData: FormData
) {
  const name = formData.get("productName");
  const manufacturer = formData.get("manufacturer");
  const manufacture_location = formData.get("manufacture_location");
  const brand = formData.get("brand");
  const model = formData.get("model");
  const gender = formData.get("gender");
  const style = formData.get("style");
  const functions = formData.getAll("functions");
  const movement = formData.get("movement");
  const bezelMaterial = formData.get("bezelMaterial");
  const bezelColor = formData.get("bezelColor");
  const caseMaterial = formData.get("caseMaterial");
  const caseColor = formData.get("caseColor");
  const bandMaterial = formData.get("bandMaterial");
  const bandColor = formData.get("bandColor");
  const dialColor = formData.get("dialColor");
  const waterResistance = formData.get("waterResistance");
  const warranty = formData.get("warranty");
  const caseShape = formData.get("caseShape");
  const caseDiameter = formData.get("caseDiameter");
  const caseThickness = formData.get("caseThickness");
  const lugWidth = formData.get("lugWidth");
  const weight = formData.get("weight");
  const compilation = formData.get("compilation");
  const price = formData.get("price");
  const sale_price = formData.get("sale_price");
  const description = formData.get("description");
  const stock = formData.get("stock");
  const reference = formData.get("reference");
  const sku = formData.get("sku");
  const ean_upc = formData.get("ean_upc");
  const availability = formData.get("availability");
  const images = formData.getAll("images");
  const releaseDate = formData.get("releaseDate");
  const tags = formData.get("tags");

  const tagsToArray = tags
    ? tags
        .toString()
        .split(/[-،]/)
        .map((s) => s.trim())
    : [];

  const features = {
    movement,
    bezelMaterial,
    bezelColor,
    caseMaterial,
    caseColor,
    bandMaterial,
    bandColor,
    dialColor,
    waterResistance,
    warranty,
  };

  const specifications = {
    caseShape,
    caseDiameter: caseDiameter ? parseFloat(caseDiameter as string) : null,
    caseThickness: caseThickness ? parseFloat(caseThickness as string) : null,
    lugWidth: lugWidth ? parseFloat(lugWidth as string) : null,
    weight: weight ? Number(weight) : null,
  };

  if (
    !name ||
    !manufacturer ||
    !brand ||
    !model ||
    !gender ||
    !price ||
    !sale_price ||
    !description ||
    !sku ||
    !images.length
  ) {
    return { error: "تمام فیلدهای ستاره دار را پر کنید" };
  }

  if (Number(price) < Number(sale_price)) {
    return { error: "قیمت فروش (قیمت تخفیف دار) باید کمتر از قیمت محصول باشد" };
  }

  if (description) {
    if (
      description.toString().length < 20 ||
      description.toString().length > 1000
    ) {
      return { error: "توضیحات باید بین 20 تا 1000 کاراکتر باشد" };
    }
  }

  console.log(functions);
  try {
    const client = await clientPromise;
    const collection = client.db("fakeData").collection("products");

    const product = await collection.findOne({ SKU: sku });

    if (product) {
      return { error: "محصول با اس کی یو مشابه قبلا ثبت شده است!" };
    }

    const data = await collection.insertOne({
      name: name ?? "",
      manufacturer: manufacturer ?? "",
      manufacture_location: manufacture_location ?? "",
      brand: brand ?? "",
      model: model ?? "",
      gender: gender ?? "",
      style: style ?? "",
      functions: functions ?? [],
      compilation: compilation ?? "",
      price: price ? parseFloat(price as string) : null,
      sale_price: sale_price ? parseFloat(sale_price as string) : null,
      description: description ?? "",
      stock: stock ? Number(stock) : null,
      reference: reference ?? "",
      SKU: sku ?? "",
      EAN_EPU: ean_upc ?? "",
      features: features ?? "",
      specifications: specifications ?? "",
      availability: availability === "on" ? true : false,
      images: images ?? [],
      releaseDate: new Date(releaseDate as string),
      tags: tagsToArray ?? [],
      reviews: [],
      createdAt: new Date(),
    });

    console.log(data);
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Product.",
    };
  }
  revalidatePath("/admin-area/store/products");
  redirect("/admin-area/store/products");
}

export async function updateCustomer(
  id: string,
  _currentState: unknown,
  formData: FormData
) {
  const username = formData.get("username");
  const email = formData.get("email");
  const newPassword = formData.get("password")?.toString();
  const rolesArray = Array.from(formData.getAll("roles"));
  const address = formData.get("address");

  try {
    const client = await clientPromise;
    const collection = client.db("fakeData").collection("users");

    const user = await collection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return { error: "کاربر یافت نشد!" };
    }

    if (newPassword) {
      if (!validatePassword(newPassword)) {
        return { error: "Invalid password format" };
      }

      const hash = bcrypt.hashSync(newPassword, 8);

      await collection.updateOne(
        { _id: user._id },
        {
          $set: {
            username,
            email,
            password: hash,
            roles: rolesArray,
            address,
          },
          $currentDate: { updatedAt: true },
        }
      );
    } else {
      await collection.updateOne(
        { _id: user._id },
        {
          $set: {
            username,
            email,
            roles: rolesArray,
            address,
          },
          $currentDate: { updatedAt: true },
        }
      );
    }
  } catch (error) {
    console.error("Database Error:", error);
    return {
      error: "Database Error: Failed to Update Customer.",
    };
  }
  revalidatePath("/admin-area/store/customers");
  redirect("/admin-area/store/customers");
}

export async function deleteCustomer(id: string) {
  try {
    const client = await clientPromise;
    const collection = client.db("fakeData").collection("users");
    const objectId = new ObjectId(id);

    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } catch (error) {
    console.error("Error deleting customer:", error);
    return {
      error: "Database Error: Failed to delete customer.",
    };
  }

  revalidatePath("/admin-area/store/customers");
}
