// auth.ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import pool from '@/utils/db/db';
import { RowDataPacket } from 'mysql2';
import { IUser } from '@/app/lib/interface/user'
import { NextRequest, NextResponse } from 'next/server';
import { roleEnum } from './app/lib/enum/roleEnum';

// Define the schema for credentials validation
const CredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

// Function to fetch user by username
async function getUser(username: string): Promise<IUser | undefined> {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM pos_user WHERE username = ?`, [username]);
    const users = rows as IUser[];
    return users.length > 0 ? users[0] : undefined;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  } finally {
    if (connection) connection.release();
  }
}

// Convert IUser to NextAuth User
function convertToNextAuthUser(user: IUser) {
  return {
    id: user.id.toString(),
    name: user.name,
    role: user.role
  };
}

// Configure NextAuth
export const { auth, handlers, signIn, signOut } = NextAuth({

  ...authConfig,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsedCredentials = CredentialsSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUser(username);

          if (!user) {
            console.log('No user found with this username:', username);
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return convertToNextAuthUser(user);
          } else {
            console.log('Invalid password for user:', user.username);
            return null;
          }
        } else {
          console.log('Invalid credentials format:', parsedCredentials.error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.role = token.role;
      }
      return session;
    },
  },

});

export const getSession = async () => {
  const session = await auth();
  return session;
};

export const authorizeRole = (roles: roleEnum[]) => {
  return async () => {
    try {
      const session = await auth();
      if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }

      const userRole = session.role;
      if (!roles.includes(userRole)) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
      }

      return NextResponse.next();
    } catch (error) {
      console.error('Error during role authorization:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  };
};