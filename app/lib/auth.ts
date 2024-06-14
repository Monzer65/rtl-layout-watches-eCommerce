import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

const accessExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

const key = new TextEncoder().encode(ACCESS_SECRET);
const refreshKey = new TextEncoder().encode(REFRESH_SECRET);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(accessExpires)
    .sign(key);
}

export async function encryptRefresh(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(refreshExpires)
    .sign(refreshKey);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function decryptRefresh(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, refreshKey, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (!session) {
    return handleRefreshToken(request);
  }
  return NextResponse.next();
  // return new NextResponse("Session is valid", { status: 200 });
}

async function handleRefreshToken(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    // No session and no refresh token
    return new NextResponse("No session or refresh token found", {
      status: 401,
    });
  }

  const decodedRefresh = await decryptRefresh(refreshToken);

  if (!decodedRefresh) {
    // Invalid refresh token
    return new NextResponse("Refresh Token is not valid", {
      status: 401,
    });
  }

  try {
    const response = await fetch(
      "http://localhost:3000/api/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          cookie: `refreshToken=${refreshToken}`,
        },
      }
    );

    if (!response.ok) {
      return new NextResponse(
        "خطا در دریافت توکن جدید. لطفا دوباره تلاش کنید یا دوباره وارد شوید",
        {
          status: 401,
        }
      );
    }

    const { newAccessToken, newRefreshToken } = await response.json();

    const res = NextResponse.next();

    res.cookies.set("session", newAccessToken, {
      httpOnly: true,
      expires: accessExpires,
    });

    res.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      expires: refreshExpires,
    });

    return res;
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to refresh session", { status: 500 });
  }
}

// export async function updateSession(request: NextRequest) {
//   const session = request.cookies.get("session")?.value;
//   if (!session) {
//     const refreshSession = request.cookies.get("refreshToken")?.value;
//     if (!refreshSession) return;

//     try {
//       const decoded = await decryptRefresh(refreshSession);

//       const response = await fetch(
//         "http://localhost:3000/api/auth/refresh-token",
//         {
//           method: "POST",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ refreshToken: refreshSession }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch new access token");
//       }

//       const data = await response.json();
//       const newAccessToken = data.newAccessToken;
//       console.log("newAccessToken:", newAccessToken);

//       // Update the session cookie with the new access token
//       const accessExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

//       const res = NextResponse.next();
//       res.cookies.set({
//         name: "session",
//         value: newAccessToken,
//         httpOnly: true,
//         expires: accessExpires,
//       });
//       return res;

//       // Redirect or update the state as necessary
//     } catch (error) {
//       console.error("Failed to refresh session:", error);
//       // Handle error appropriately, e.g., by redirecting to login or notifying the user
//     }
//     redirect("/login");
//   } else {
//     const parsed = await decrypt(session);
//     parsed.expires = new Date(Date.now() + 10 * 1000);
//     const res = NextResponse.next();
//     res.cookies.set({
//       name: "session",
//       value: await encrypt(parsed),
//       httpOnly: true,
//       expires: parsed.expires,
//     });
//     return res;
//   }
// }

// const jwtConfig = {
//   secret: new TextEncoder().encode(process.env.ACCESS_SECRET),
// };

// export const isAuthenticated = async (req: any) => {
//   let token =
//     req.headers.get("authorization") || req.headers.get("Authorization");

//   if (token) {
//     try {
//       if (token.startsWith("Bearer")) {
//         token = token.replace("Bearer ", "");
//       }

//       const decoded = await jwtVerify(token, jwtConfig.secret);

//       if (decoded.payload?.username) {
//         return true;
//       } else {
//         return false;
//       }
//     } catch (err) {
//       console.error("isAuthenticated error: ", err);

//       return false;
//     }
//   } else {
//     return false;
//   }
// };
