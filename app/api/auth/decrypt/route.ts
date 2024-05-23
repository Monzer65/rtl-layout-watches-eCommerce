import { decryptAccess, decryptRefresh } from "@/app/lib/authTokens";
import { cookies } from "next/headers";

export async function POST(request: Request): Promise<Response> {
  try {
    // const accessToken = cookies().get("accessToken");
    const refreshToken = cookies().get("refreshToken");

    if (!refreshToken) {
      return new Response(JSON.stringify({ error: "No token" }), {
        status: 400,
      });
    }

    // const decodedAccessToken = await decryptAccess(accessToken.value);
    const decodedrefreshToken = await decryptRefresh(refreshToken.value);
    return new Response(JSON.stringify({ decodedrefreshToken }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
