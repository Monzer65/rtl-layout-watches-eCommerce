import bcrypt from "bcryptjs";
import { validateEmail } from "@/app/lib/helpers/validateEmail";
import { validatePassword } from "@/app/lib/helpers/validatePassword";
import clientPromise from "@/app/lib/dbConnection";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!validateEmail(email) || !validatePassword(password)) {
    return new Response(
      JSON.stringify({
        error: "ایمیل یا پسورد ناصحیح است؛ پسورد باید حداقل 6 کاراکتر باشد",
      }),
      {
        status: 400,
      }
    );
  }

  const hash = bcrypt.hashSync(password, 8);

  try {
    const client = await clientPromise;
    console.log("Connected to database");

    const collection = client.db("fakeData").collection("users");

    const user = await collection.findOne({ email });

    if (user) {
      return new Response(
        JSON.stringify({
          error: "کاربر قبلا ثبت نام کرده است؛ از لینک ورود استفاده کنید",
        }),
        { status: 400 }
      );
    }

    await collection.insertOne({
      email,
      password: hash,
      roles: ["user"],
      createdAt: new Date(),
    });

    console.log("New user added to database");

    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
