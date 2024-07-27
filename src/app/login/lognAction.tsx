"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function loginAction(
  currentState: any,
  formData: FormData
): Promise<string> {
  const username = formData.get("username");
  const password = formData.get("password");

  
  const res = await fetch(`${process.env.ROOT_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const json = await res.json();

  if (res.ok) {
    cookies().set("Authorization", json.token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      path: "/",
      sameSite: "strict",
    });
    redirect("/admin");
  } else {
    return json.error;
  }
}