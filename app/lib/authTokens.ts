import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const accessSecret = process.env.ACCESS_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;
const accessKey = new TextEncoder().encode(accessSecret);
const refreshKey = new TextEncoder().encode(refreshSecret);
export const accessExpires = new Date(Date.now() + 100 * 1000); //100 seconds
export const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); //7days

export async function encryptAccess(payload: any): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(accessExpires)
    .sign(accessKey);
}

export async function decryptAccess(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, accessKey, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function encryptRefresh(payload: any): Promise<string> {
  const uniqueTokenId = generateUniqueId();

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer("my_watches_shop_app")
    .setJti(uniqueTokenId)
    .setIssuedAt(Math.floor(Date.now() / 1000))
    .setExpirationTime(refreshExpires)
    .sign(refreshKey);
}

export async function decryptRefresh(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, refreshKey, {
    algorithms: ["HS256"],
  });
  return payload;
}

function generateUniqueId() {
  const randomString = Math.random().toString(36).substring(2);
  const timestamp = Date.now();
  // Combine the random string and timestamp to create a unique identifier
  const uniqueId = randomString + timestamp;
  return uniqueId;
}

export function setAuthCookies(accessToken: string, refreshToken: string) {
  cookies().set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: accessExpires,
    path: "/",
  });
  cookies().set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: refreshExpires,
    path: "/",
  });
}
