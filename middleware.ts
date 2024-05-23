import { NextResponse, type NextRequest } from "next/server";
import {
  accessExpires,
  decryptAccess,
  decryptRefresh,
  encryptAccess,
  encryptRefresh,
  refreshExpires,
} from "./app/lib/authTokens";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let isVerifiedAccessToken = false;
  let userRoles = [];

  if (accessToken) {
    try {
      const decodedAccess = await decryptAccess(accessToken);
      isVerifiedAccessToken = true;
      userRoles = decodedAccess.user.roles || [];
    } catch (err) {
      console.log("Error decrypting access token:", err);
    }
  }

  const response = NextResponse.next();

  if (!accessToken && refreshToken) {
    try {
      const decodedRefresh = await decryptRefresh(refreshToken);

      // Generate new tokens
      const newAccessToken = await encryptAccess(decodedRefresh);
      const newRefreshToken = await encryptRefresh(decodedRefresh);

      // console.log(newAccessToken, newRefreshToken);
      response.cookies.set({
        name: "accessToken",
        value: `${newAccessToken}`,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        expires: accessExpires,
        path: "/",
      });
      response.cookies.set({
        name: "refreshToken",
        value: `${newRefreshToken}`,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        expires: refreshExpires,
        path: "/",
      });

      isVerifiedAccessToken = true;
      userRoles = decodedRefresh.user.roles || [];
    } catch (err) {
      console.log("Error obtaining new tokens:", err);
    }
  }

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin-area")) {
    if (!isVerifiedAccessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!userRoles.includes("admin")) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  if (pathname.includes("/dashboard")) {
    if (!isVerifiedAccessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!userRoles.includes("user")) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  if (isVerifiedAccessToken && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/blog/dashboard", request.url));
  }

  return response;
}

export const config = {
  // matcher: [
  //   /*
  //    * Match all request paths except for the ones starting with:
  //    * - api (API routes)
  //    * - _next/static (static files)
  //    * - _next/image (image optimization files)
  //    * - favicon.ico (favicon file)
  //    */
  //   "/((?!api|_next/static|_next/image|favicon.ico).*)",
  // ],
  matcher: ["/admin-area/:path*", "/:path*/dashboard/:path*"],
};
