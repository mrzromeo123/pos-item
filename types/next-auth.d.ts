import { type DefaultSession } from 'next-auth';
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { roleEnum } from '@/app/lib/enum/roleEnum';

declare module "next-auth" {
  interface Session {
    id: string;
    role: roleEnum;
  }

  interface User {
    id: string;
    role: roleEnum;
  } 
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: roleEnum;
  }
}
