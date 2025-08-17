import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "./lib/types/response";
import { UserRole } from "./lib/enums";

function decodeJwt(token: string): JwtPayload | null {
    try {
        const payload = JSON.parse(atob(token.split('.')[1].replace(/_/g, '/').replace(/-/g, '+')));
        return payload
    } catch (error) {
        return null
    }
}

export function middleware(req: NextRequest) {
    const token = req.cookies.get('thrift')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    const payload = decodeJwt(token)

    if(!payload || payload.role !== UserRole.ADMIN || payload.exp < Date.now() / 1000) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }
}

export const config = {
  matcher: ['/admin/:path*'],
};
