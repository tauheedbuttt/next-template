import { NextResponse, NextRequest } from "next/server";

const urls = ["/login"];

export function middleware(req: NextRequest) {
  const token = req.cookies.has("token");
  const path = req.nextUrl.pathname;

  if (!token && !urls.includes(path)) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (token && urls.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
