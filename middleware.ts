import { NextRequest, NextResponse } from "next/server";
import isAuth from "./app/admin/lib/isAuth";

const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const isLogged = await isAuth();

  //
  //handle not logges case
  if (!isLogged && path !== "/admin/login") {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  //
  //handling /admin/login
  if (isLogged && path === "/admin/login") {
    return NextResponse.redirect(new URL("/admin/", req.url));
  }

  return NextResponse.next();
};
export default middleware;

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
