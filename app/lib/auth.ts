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
    return await handleRefreshToken(request);
  }

  try {
    const res = NextResponse.next();
    const decoded = await decrypt(session);
    // Invalid refresh token
    if (!decoded) {
      return new NextResponse("Session could not be decoded", { status: 403 });
    }
    // If session is valid, proceed with the response
    return res;
  } catch (error) {
    console.error("Error decoding session:", error);
    return new NextResponse("Failed to verify session", { status: 403 });
  }
}

async function handleRefreshToken(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    // No session and no refresh token
    return new NextResponse("No session or refresh token found", {
      status: 401,
    });
  }

  try {
    const decodedRefresh = await decryptRefresh(refreshToken);

    if (!decodedRefresh) {
      // Invalid refresh token
      return new NextResponse("Refresh Token is not valid", {
        status: 403,
      });
    }

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

    if (!newAccessToken || !newRefreshToken) {
      return new NextResponse("Failed to generate new tokens", { status: 500 });
    }

    // console.log("new access token:", newAccessToken);
    // console.log("new refresh token:", newRefreshToken);

    const res = NextResponse.next();

    res.cookies.set("session", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: accessExpires,
      path: "/",
    });

    res.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: refreshExpires,
      path: "/",
    });

    return res;
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to refresh session", { status: 500 });
  }
}

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
