import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import { roleEnum } from './app/lib/enum/roleEnum';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl, auth } = req;
  const isAuthenticated = !!auth;
  const role = req.auth?.user?.role;
  const isLoginPage = nextUrl.pathname.startsWith('/login');
  const isAdminPage = nextUrl.pathname.startsWith('/admin');
  const isSelfCashierPage = nextUrl.pathname.startsWith('/self-cashier');

  if (role === roleEnum.SELF_CASHIER && isAuthenticated) {
    if (isSelfCashierPage) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/self-cashier', nextUrl.origin));
    }
  }

  if (isAdminPage && role) {
    if (role === roleEnum.ADMIN) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/cashier', nextUrl.origin));
    }
  } else {
    if (isLoginPage && isAuthenticated) {
      return NextResponse.redirect(new URL('/cashier', nextUrl.origin));
    } else if (!isLoginPage && !isAuthenticated) {
      return NextResponse.redirect(new URL('/login', nextUrl.origin));
    }
  }
});


export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};