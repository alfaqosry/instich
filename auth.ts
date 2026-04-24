// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      // Kita ganti labelnya jadi 'identifier' agar mewakili keduanya
      credentials: {
        identifier: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) return null;

        const identifier = credentials.identifier as string;

        // CARI USER: Berdasarkan Email ATAU Username
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: identifier },
              { username: identifier }
            ]
          }
        });

        if (!user || !user.password) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordCorrect) return null;

        // Return data yang ingin disimpan di session
        return { 
          id: user.id, 
          name: user.name, 
          email: user.email,
          username: user.username // Tambahkan ini jika perlu di session
        };
      },
    }),
  ],
  // Tambahan: Agar username terbawa ke objek session di frontend
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.username = token.username;
      }
      return session;
    },
  },
});