import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // decode session token
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  // if no token → redirect to login
  if (!token) {
    console.log(token,"token")
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // if user is not admin → redirect to login (or home)
  if (token.role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // else allow request to continue
  return NextResponse.next();
}


export const config = {
  matcher: ['/dashboard/:path*'],  // protect dashboard routes
};
