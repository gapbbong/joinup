import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Kakao from "next-auth/providers/kakao"
import Naver from "next-auth/providers/naver"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || "placeholder",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder",
        }),
        Kakao({
            clientId: process.env.KAKAO_CLIENT_ID || "placeholder",
            clientSecret: process.env.KAKAO_CLIENT_SECRET || "placeholder",
        }),
        Naver({
            clientId: process.env.NAVER_CLIENT_ID || "placeholder",
            clientSecret: process.env.NAVER_CLIENT_SECRET || "placeholder",
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                return { id: "test-user", name: "Test User", email: "test@example.com" }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
            }
            return session;
        },
    },
    // No custom pages to ensure default sign-in works
    secret: process.env.AUTH_SECRET || "6cd5551c-bf85-4d03-90a5-28269043a1a1",
    trustHost: true,
})

export const { GET, POST } = handlers
