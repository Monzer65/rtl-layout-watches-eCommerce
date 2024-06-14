import { NextRequest } from "next/server";
import clientPromise from "@/app/lib/dbConnection";
import { decryptRefresh, encrypt, encryptRefresh } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return new Response(
      JSON.stringify({ error: "No Refresh Token Provided!" }),
      { status: 401 }
    );
  }

  try {
    const client = await clientPromise;
    const collection = client.db("fakeData").collection("users");

    // Attempt to find user with the provided refresh token
    const user = await collection.findOne({ refreshToken: refreshToken });

    if (!user) {
      // If no user is found, check if the refresh token is compromised
      const decoded = await decryptRefresh(refreshToken);

      if (!decoded) {
        return new Response(
          JSON.stringify({ error: "Invalid Refresh Token" }),
          { status: 403 }
        );
      }

      // Invalidate all refresh tokens for the compromised user
      await collection.updateOne(
        { username: decoded.username },
        { $set: { refreshToken: [] } }
      );

      return new Response(JSON.stringify({ error: "Unauthorized Access!" }), {
        status: 403,
      });
    }

    const accessExpires = new Date(Date.now() + 10 * 60 * 1000);
    const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // Generate new access and refresh tokens
    const newAccessToken = await encrypt({
      username: user.username,
      roles: user.roles,
      expires: accessExpires,
    });

    const newRefreshToken = await encryptRefresh({
      username: user.username,
      expires: refreshExpires,
    });

    // Update the user's refresh tokens in the database
    await collection.updateOne(
      { _id: user._id },
      { $set: { refreshToken: [newRefreshToken] } }
    );

    return new Response(JSON.stringify({ newAccessToken, newRefreshToken }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

//     user.refreshToken = user.refreshToken
//       .filter((rt: string) => rt !== refreshToken)
//       .concat(newRefreshToken);
//     await collection.updateOne({ _id: user._id }, { $set: user });
