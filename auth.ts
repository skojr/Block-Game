
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import prisma from "./lib/prisma"
import { randomUUID } from "crypto"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
      // Be explicit so `session.user.image` is reliably populated.
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false

      await prisma.user.upsert({
        where: { email: user.email },
        update: { name: user.name ?? null },
        create: { id: randomUUID(), email: user.email, name: user.name ?? null },
      })

      return true
    },
  },
})