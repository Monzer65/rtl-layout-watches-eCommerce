"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import clientPromise from "./dbConnection";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { validatePassword } from "./helpers/validatePassword";
import { encrypt, encryptRefresh } from "./auth";
import { validateEmail } from "./helpers/validateEmail";

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

    const generateUniqueUsername = (email: string) => {
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      return email.split("@")[0] + "_" + randomString + "_" + timestamp;
    };

    const newUser = {
      _id: new ObjectId(),
      username: generateUniqueUsername(email.toString()),
      email,
      password: hash,
      roles: ["user"],
      refreshToken: [] as string[],
      createdAt: new Date(),
    };

    await collection.insertOne(newUser);

    const accessExpires = new Date(Date.now() + 10 * 1000);
    const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const session = await encrypt({
      username: newUser.username,
      roles: newUser.roles,
      expires: accessExpires,
    });

    const refreshSession = await encryptRefresh({
      username: newUser.username,
      expires: refreshExpires,
    });

    newUser.refreshToken.push(refreshSession);
    await collection.updateOne({ _id: newUser._id }, { $set: newUser });

    cookies().set("session", session, {
      expires: accessExpires,
      httpOnly: true,
    });

    cookies().set("refreshToken", refreshSession, {
      expires: refreshExpires,
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

    const accessExpires = new Date(Date.now() + 10 * 1000);
    const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const session = await encrypt({
      username: user.username,
      roles: user.roles,
      expires: accessExpires,
    });

    const refreshSession = await encryptRefresh({
      username: user.username,
      expires: refreshExpires,
    });

    user.refreshToken.push(refreshSession);
    await collection.updateOne({ _id: user._id }, { $set: user });

    cookies().set("session", session, {
      expires: accessExpires,
      httpOnly: true,
    });

    cookies().set("refreshToken", refreshSession, {
      expires: refreshExpires,
      httpOnly: true,
    });

    console.log("Redirecting to /blog/dashboard");
  } catch (error) {
    console.error("Database error:", error);
    return "خطای دیتابیس. لطفا بعدا تلاش کنید";
  }

  redirect("/blog/dashboard");
}

export async function logout() {
  // cookies().delete("accessToken");
  // cookies().delete("refreshToken");
  cookies().set("accessToken", "", { expires: new Date(0) });
  cookies().set("refreshToken", "", { expires: new Date(0) });
  redirect("/");
}

export async function createCustomer(
  _currentState: unknown,
  formData: FormData
) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const address = formData.get("address");

  const hash = bcrypt.hashSync(`${password}`, 8);

  try {
    const client = await clientPromise;
    const collection = client.db("fakeData").collection("users");

    const user = await collection.findOne({ email });

    if (user) {
      return { error: "کاربر قبلا ثبت شده است!" };
    }

    await collection.insertOne({
      name,
      email,
      password: hash,
      address,
      roles: ["user"],
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
  const name = formData.get("name");
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
            name,
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
            name,
            email,
            roles: rolesArray,
            address,
          },
          $currentDate: { updatedAt: true },
        }
      );
    }
    revalidatePath("/admin-area/store/customers");
    redirect("/admin-area/store/customers");
  } catch (error) {
    console.error("Database Error:", error);
    return {
      error: "Database Error: Failed to Update Customer.",
    };
  }
}
