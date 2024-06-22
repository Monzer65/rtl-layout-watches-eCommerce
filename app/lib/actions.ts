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
import { v2 as cloudinary, v2 } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

export async function createProduct(
  _currentState: unknown,
  formData: FormData
) {
  const requiredFields = [
    "name",
    "sku",
    "manufacturer",
    "brand",
    "model",
    "gender",
    "price",
    "buy_price",
    "sale_price",
    "short_description",
    "description",
    "images",
  ];

  const allFields = [
    "manufacture_location",
    "style",
    "movement",
    "bezelMaterial",
    "bezelColor",
    "caseMaterial",
    "caseColor",
    "bandMaterial",
    "bandColor",
    "dialColor",
    "waterResistance",
    "warranty",
    "caseShape",
    "caseDiameter",
    "caseThickness",
    "lugWidth",
    "weight",
    "compilation",
    "stock",
    "availability",
    "releaseDate",
    "tags",
  ];

  const formDataEntries = Object.fromEntries(
    [...requiredFields, ...allFields].map((field) => [
      field,
      formData.get(field),
    ])
  );

  const {
    name,
    sku,
    manufacturer,
    manufacture_location,
    brand,
    model,
    gender,
    price,
    buy_price,
    sale_price,
    short_description,
    description,
    style,
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
    caseShape,
    caseDiameter,
    caseThickness,
    lugWidth,
    weight,
    compilation,
    stock,
    availability,
    releaseDate,
    tags,
  } = formDataEntries;

  const functions = formData.getAll("functions") as string[];
  const images = formData.getAll("images") as File[];
  let imageUrls: string[] = [];

  // Check for required fields
  if (!requiredFields.every((field) => formDataEntries[field])) {
    return { error: "تمام فیلدهای ستاره دار را پر کنید" };
  }

  // Check numeric values and positive numbers
  const numericFields = {
    price,
    buy_price,
    sale_price,
    stock,
    weight,
    caseDiameter,
    caseThickness,
    lugWidth,
  };

  for (const [field, value] of Object.entries(numericFields)) {
    if (value && isNaN(Number(value))) {
      return { error: `${field} باید یک عدد معتبر باشد` };
    }
    if (value && Number(value) < 0) {
      return { error: `${field} باید یک عدد مثبت باشد` };
    }
  }

  if (Number(price) < Number(sale_price)) {
    return { error: "قیمت فروش (قیمت تخفیف دار) باید کمتر از قیمت محصول باشد" };
  }

  if (Number(buy_price) > Number(sale_price)) {
    return { error: "قیمت فروش باید بیشتر از قیمت خرید باشد" };
  }

  if (
    (short_description && (short_description as string).length < 20) ||
    (short_description as string).length > 1000
  ) {
    return { error: "توضیحات کوتاه باید بین 20 تا 1000 کاراکتر باشد" };
  }

  if (
    (description && (description as string).length < 20) ||
    (description as string).length > 1000
  ) {
    return { error: "توضیحات باید بین 20 تا 1000 کاراکتر باشد" };
  }

  if (releaseDate && isNaN(Date.parse(releaseDate as string))) {
    return { error: "تاریخ انتشار نامعتبر است" };
  }

  if (!Array.isArray(images) || images.length === 0) {
    return { error: "تصاویر باید بارگذاری شوند" };
  }

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

  try {
    const client = await clientPromise;
    const collection = client.db("fakeData").collection("products");
    const existingProduct = await collection.findOne({ SKU: sku });

    if (existingProduct) {
      return { error: "محصول با اس کی یو مشابه قبلا ثبت شده است!" };
    }

    for (const image of images) {
      if (typeof image === "string") {
        imageUrls.push(image);
        // console.log("Form Data Image URL:", image);
      } else {
        // Handle file (object)
        const bufferArray = await image.arrayBuffer();
        const buffer = new Uint8Array(bufferArray);

        try {
          await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  folder: "watches",
                },
                function (error, result) {
                  if (error) {
                    reject(error); // Reject the promise on error
                    return;
                  }
                  resolve(result);
                  if (result) {
                    imageUrls.push(result?.url);
                  }
                  // console.log("Uploaded Image Url:", result?.url);
                }
              )
              .end(buffer);
          });
        } catch (error) {
          console.error("Error uploading image:", error);
          return { message: "خطا در بارگزاری تصاویر" };
        }
      }
    }

    const data = await collection.insertOne({
      name: name ?? "",
      SKU: sku ?? "",
      manufacturer: manufacturer ?? "",
      manufacture_location: manufacture_location ?? "",
      brand: brand ?? "",
      model: model ?? "",
      gender: gender ?? "",
      style: style ?? "",
      functions: functions ?? [],
      compilation: compilation ?? "",
      price: price ? parseFloat(price as string) : null,
      buy_price: buy_price ? parseFloat(buy_price as string) : null,
      sale_price: sale_price ? parseFloat(sale_price as string) : null,
      description: description ?? "",
      stock: stock ? Number(stock) : null,
      features,
      specifications,
      availability: availability === "on",
      images: imageUrls,
      releaseDate: releaseDate ? new Date(releaseDate as string) : null,
      tags: tagsToArray,
      reviews: [],
      createdAt: new Date(),
    });
  } catch (error) {
    return { message: "خطای دیتابیس: ایجاد محصول جدید ناموفق بود" };
  }

  revalidatePath("/admin-area/store/products");
  redirect("/admin-area/store/products");
}

export async function updateProduct(
  id: string,
  _currentState: unknown,
  formData: FormData
) {
  const requiredFields = [
    "name",
    "sku",
    "manufacturer",
    "brand",
    "model",
    "gender",
    "price",
    "images",
  ];

  const allFields = [
    "manufacture_location",
    "buy_price",
    "sale_price",
    "short_description",
    "description",
    "style",
    "movement",
    "bezelMaterial",
    "bezelColor",
    "caseMaterial",
    "caseColor",
    "bandMaterial",
    "bandColor",
    "dialColor",
    "waterResistance",
    "warranty",
    "caseShape",
    "caseDiameter",
    "caseThickness",
    "lugWidth",
    "weight",
    "compilation",
    "stock",
    "availability",
    "releaseDate",
    "tags",
  ];

  const formDataEntries = Object.fromEntries(
    [...requiredFields, ...allFields].map((field) => [
      field,
      formData.get(field),
    ])
  );

  const {
    name,
    sku,
    manufacturer,
    manufacture_location,
    brand,
    model,
    gender,
    price,
    buy_price,
    sale_price,
    short_description,
    description,
    style,
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
    caseShape,
    caseDiameter,
    caseThickness,
    lugWidth,
    weight,
    compilation,
    stock,
    availability,
    releaseDate,
    tags,
  } = formDataEntries;

  const functions = formData.getAll("functions") as string[];
  const images = formData.getAll("images") as File[] | string[];

  function getReviews(formData: FormData) {
    const reviews: any[] = [];
    const keys = Array.from(formData.keys());
    const reviewMap = new Map();

    keys.forEach((key) => {
      const match = key.match(/reviews\[(\d+)\]\.(\w+)/);
      if (match) {
        const [, index, field] = match;
        if (!reviewMap.has(index)) {
          reviewMap.set(index, {});
        }
        reviewMap.get(index)[field] = formData.get(key);
      }
    });

    reviewMap.forEach((value, key) => {
      reviews.push({
        userId: value.userId,
        username: value.username,
        rating: parseInt(value.rating, 10),
        comment: value.comment,
        date: new Date(value.date),
      });
    });

    return reviews;
  }

  const reviews = getReviews(formData);

  // Check for required fields
  if (!requiredFields.every((field) => formDataEntries[field])) {
    return { error: "تمام فیلدهای ستاره دار را پر کنید" };
  }

  // Check numeric values and positive numbers
  const numericFields = {
    price,
    buy_price,
    sale_price,
    stock,
    weight,
    caseDiameter,
    caseThickness,
    lugWidth,
  };

  for (const [field, value] of Object.entries(numericFields)) {
    if (value && isNaN(Number(value))) {
      return { error: `${field} باید یک عدد معتبر باشد` };
    }
    if (value && Number(value) < 0) {
      return { error: `${field} باید یک عدد مثبت باشد` };
    }
  }

  if (Number(price) < Number(sale_price)) {
    return { error: "قیمت فروش (قیمت تخفیف دار) باید کمتر از قیمت محصول باشد" };
  }

  if (Number(buy_price) > Number(sale_price)) {
    return { error: "قیمت فروش باید بیشتر از قیمت خرید باشد" };
  }

  // if (
  //   (short_description && (short_description as string).length < 20) ||
  //   (short_description as string).length > 1000
  // ) {
  //   return { error: "توضیحات کوتاه باید بین 20 تا 1000 کاراکتر باشد" };
  // }

  // if (
  //   (description && (description as string).length < 20) ||
  //   (description as string).length > 1000
  // ) {
  //   return { error: "توضیحات باید بین 20 تا 1000 کاراکتر باشد" };
  // }

  if (releaseDate && isNaN(Date.parse(releaseDate as string))) {
    return { error: "تاریخ انتشار نامعتبر است" };
  }

  if (!Array.isArray(images) || images.length === 0) {
    return { error: "تصاویر باید بارگذاری شوند" };
  }

  const tagsToArray = tags
    ? tags
        .toString()
        .split(/[-،,]/)
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

  try {
    const client = await clientPromise;
    const collection = client.db("fakeData").collection("products");
    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return { message: "Product not found" };
    }

    const imageUrls: string[] = [];

    for (const image of images) {
      if (typeof image === "string") {
        // Existing image URL
        imageUrls.push(image);
      } else {
        // Handle file (object)
        const bufferArray = await image.arrayBuffer();
        const buffer = new Uint8Array(bufferArray);

        try {
          await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  folder: "watches",
                },
                function (error, result) {
                  if (error) {
                    reject(error);
                    return;
                  }
                  resolve(result);
                  if (result) {
                    imageUrls.push(result.url);
                  }
                  console.log("Uploaded Image Url:", result?.url);
                }
              )
              .end(buffer);
          });
        } catch (error) {
          console.error("Error uploading image:", error);
          return { message: "خطا در بارگزاری تصاویر" };
        }
      }
    }

    const data = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: name ?? "",
          SKU: sku ?? "",
          manufacturer: manufacturer ?? "",
          manufacture_location: manufacture_location ?? "",
          brand: brand ?? "",
          model: model ?? "",
          gender: gender ?? "",
          style: style ?? "",
          functions: functions ?? [],
          compilation: compilation ?? "",
          price: price ? parseFloat(price as string) : null,
          buy_price: buy_price ? parseFloat(buy_price as string) : null,
          sale_price: sale_price ? parseFloat(sale_price as string) : null,
          short_description: short_description ?? "",
          description: description ?? "",
          stock: stock ? Number(stock) : null,
          features,
          specifications,
          availability: availability === "on",
          images: imageUrls,
          releaseDate: releaseDate ? new Date(releaseDate as string) : null,
          tags: tagsToArray,
          reviews: reviews,
          updatedAt: new Date(),
        },
      }
    );
  } catch (error) {
    return { message: "خطای دیتابیس: ایجاد محصول جدید ناموفق بود" };
  }

  revalidatePath("/admin-area/store/products");
  redirect("/admin-area/store/products");
}
