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
        { username: decoded.payload.username },
        { $set: { refreshToken: [] } }
      );

      return new Response(JSON.stringify({ error: "Unauthorized Access!" }), {
        status: 403,
      });
    }

    // Generate new access and refresh tokens
    const newAccessToken = await encrypt({
      username: user.username,
      roles: user.roles,
    });

    const newRefreshToken = await encryptRefresh({ username: user.username });

    // Update the user's refresh tokens in the database
    await collection.updateOne(
      { _id: user._id },
      { $set: { refreshToken: [newRefreshToken] } }
    );

    // // Set the new refresh token in the response cookies
    // const response = NextResponse.next();

    // cookies().set("refreshToken", newRefreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    //   path: "/",
    // });

    return new Response(JSON.stringify({ newAccessToken, newRefreshToken }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// export async function POST(req: NextRequest) {
//   const response = NextResponse.next();

//   // Ensure the request body is parsed as JSON
//   const body = await req.json();
//   const refreshToken = body.refreshToken;

//   console.log("Received Refresh Token:", refreshToken);

//   if (!refreshToken) {
//     console.error("No Refresh Cookie Provided!");
//     return new Response(
//       JSON.stringify({ error: "No Refresh Cookie Provided!" }),
//       { status: 401 }
//     );
//   }

//   try {
//     const client = await clientPromise;
//     const collection = client.db("fakeData").collection("users");
//     console.log("Attempting to find user with refresh token:", refreshToken);
//     const user = await collection.findOne({
//       refreshToken: { $in: [refreshToken] },
//     });

//     console.log("Found user:", user);

//     if (!user) {
//       const decoded = await decryptRefresh(refreshToken);
//       if (!decoded) {
//         console.error("Failed to decrypt refresh token:", refreshToken);
//         return new Response(
//           JSON.stringify({ error: "Invalid Refresh Token" }),
//           { status: 403 }
//         );
//       }

//       console.log("Decoded refresh token payload:", decoded.payload);

//       const isCompromised = await collection.findOne({
//         username: decoded.payload.username,
//       });
//       if (isCompromised) {
//         isCompromised.refreshToken = [];
//         await collection.updateOne(
//           { _id: isCompromised._id },
//           { $set: isCompromised }
//         );
//       }

//       return new Response(JSON.stringify({ error: "Unauthorized Access!" }), {
//         status: 403,
//       });
//     }

//     const decoded = await decryptRefresh(refreshToken);

//     const newAccessToken = await encrypt({
//       username: user.username,
//       roles: user.roles,
//     });

//     const newRefreshToken = await encryptRefresh({
//       username: user.username,
//     });

//     user.refreshToken = user.refreshToken
//       .filter((rt: string) => rt !== refreshToken)
//       .concat(newRefreshToken);
//     await collection.updateOne({ _id: user._id }, { $set: user });

//     response.cookies.set("refreshToken", newRefreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//       path: "/",
//     });

//     return new Response(JSON.stringify({ newAccessToken }), { status: 200 });
//   } catch (error) {
//     console.error("Server error:", error);
//     return new Response(JSON.stringify({ error: "Internal server error" }), {
//       status: 500,
//     });
//   }
// }
