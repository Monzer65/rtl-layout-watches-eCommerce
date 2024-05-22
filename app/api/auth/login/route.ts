import { validateEmail } from "@/app/lib/helpers/validateEmail";
import { validatePassword } from "@/app/lib/helpers/validatePassword";
import bcrypt from "bcryptjs";
import clientPromise from "@/app/lib/dbConnection";
import { encryptAccess, encryptRefresh } from "@/app/lib/authTokens";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!validateEmail(email) || !validatePassword(password)) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const collection = client.db("fakeData").collection("users");
    const user = await collection.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const isMatchPassword = bcrypt.compareSync(password, user.password);
    if (!isMatchPassword) {
      return new Response(JSON.stringify({ error: "Incorrect password" }), {
        status: 401,
      });
    }

    const payload = {
      _id: user._id,
      email: user.email,
      roles: user.roles,
    };

    const accessToken = await encryptAccess({ user: payload });
    const refreshToken = await encryptRefresh({ user: payload });

    return new Response(JSON.stringify({ accessToken, refreshToken }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
