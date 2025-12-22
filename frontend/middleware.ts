import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const userId = req.cookies.get("user_id");

  if (!userId && req.nextUrl.pathname.startsWith("/tutor")) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export const config = {
  matcher: ["/tutor/:path*"],
};
