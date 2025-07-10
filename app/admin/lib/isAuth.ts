"use server";
import "server-only";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET as string);

/*
 * gets the auth status
 * from the session cookies
 *
 */
const isAuth = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return false;
  }

  try {
    jwtVerify(token, encodedKey, { algorithms: ["HS256"] });
    return true;
  } catch {
    return false;
  }
};

export default isAuth;
