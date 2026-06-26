import NextAuth from "next-auth";
import {authConfig} from "./auth.config";
import {NextResponse} from "next/server";

const {auth} = NextAuth(authConfig);

export default auth((req) => {
    if (req.nextUrl.pathname.startsWith("/admin")) {
        if (req.auth?.user?.role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }
});

export const config = {
    matcher: ["/admin/:path*"],
};