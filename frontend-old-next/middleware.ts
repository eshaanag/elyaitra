import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // ❌ Do NOT check auth here
  // Auth is handled client-side using localStorage
  return NextResponse.next();
}

export const config = {
  matcher: ["/tutor/:path*"],
};
