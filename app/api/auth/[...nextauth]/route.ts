import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import connectToDatabase from "@utils/database"
import User from "@models/user"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      if (!token.id && token.email) {
        await connectToDatabase()
        const sessionUser = await User.findOne({ email: token.email })
        if (sessionUser) {
          token.id = sessionUser._id.toString()
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user && token.id) {
        session.user.id = token.id
      }
      return session
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase()

        if (!profile?.email) return false

        const userExists = await User.findOne({ email: profile.email })

        if (!userExists) {
          await User.create({
            email: profile.email,
            username:
              profile.name?.replace(" ", "").toLowerCase() ?? profile.email,
            image:
              (profile as unknown as { picture?: string; image?: string })
                .picture ??
              (profile as unknown as { picture?: string; image?: string })
                .image,
          })
        }

        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
  },
})

export { handler as GET, handler as POST }
