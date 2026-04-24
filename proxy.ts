// proxy.ts atau middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // Perubahan di sini: Pastikan req.auth.user benar-benar ada
  const isLoggedIn = !!req.auth?.user; 
  
  const { nextUrl } = req;
  const isDashboardPage = nextUrl.pathname.startsWith("/dashboard");
  const isLoginPage = nextUrl.pathname === "/login";

  // 1. Jika BELUM login dan mencoba akses dashboard
  if (isDashboardPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 2. Jika SUDAH login dan mencoba akses halaman login
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};