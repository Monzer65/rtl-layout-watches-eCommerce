import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./app/lib/auth";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  if (response.status === 401) {
    // Redirect to login page if no session or refresh token
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (response.status === 500) {
    // Redirect to an error page if there was a server error
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Proceed with the original response if everything is fine
  return response;
}

export const config = {
  matcher: "/admin-area/:path*",
};
