"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { setAuthCookies } from "./authTokens";

export async function signup(
  _currentState: unknown,
  formData: FormData
): Promise<string> {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch(process.env.API_POST_URL + "/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  console.log(data);

  if (res.ok) {
    redirect("/login");
  } else {
    return data.error;
  }
}

export async function authenticate(
  _currentState: unknown,
  formData: FormData
): Promise<string> {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch(process.env.API_POST_URL + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    setAuthCookies(data.accessToken, data.refreshToken);
    redirect("/blog/dashboard");
  } else {
    return data.error;
  }
}

export async function logout() {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  redirect("/");
}
