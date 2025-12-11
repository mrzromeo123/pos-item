
import type { NextAuthConfig } from 'next-auth';
import { roleEnum } from './app/lib/enum/roleEnum';

export const protectedRoute = [
  {
    label: 'คิดเงิน',
    path: '/cashier',
    roles: [roleEnum.ADMIN, roleEnum.CASHIER]
  },
  {
    label: ' จัดการสินค้า',
    path: '/manage-product',
    roles: [roleEnum.ADMIN]
  },
  {
    label: 'รายงานขาย',
    path: '/order-buyer',
    roles: [roleEnum.ADMIN]
  },
  {
    label: 'ประวัติการขาย',
    path: '/Sales-History',
    roles: [roleEnum.ADMIN]
  }
]

export const authConfig = {
  session: {
    strategy: 'jwt',
    maxAge: 365 * 24 * 60 * 60

  },
  pages: {
    signIn: '/login',
  },
  
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = nextUrl.pathname.startsWith('/login');
      if (isLoginPage) {
        if (isLoggedIn) return Response.redirect(new URL('/cashier', nextUrl));
        return false;
      } else if (!isLoginPage) {
        return isLoggedIn
      }
      return isLoggedIn;
    },
    async session({ token, session }) {
      if (token?.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;