import NextAuth from "next-auth";
// import NEXT_AUTH_CONFIG from "@/lib/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import client from "@/db";
import bcrypt from "bcryptjs";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string | null;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", placeholder: "john@john.com", type: "text" },
        password: {
          label: "Password",
          placeholder: "p@SSworD",
          type: "password",
        },
      },
      async authorize(credentials: any): Promise<User | null> {
        if (!(credentials?.email && credentials?.password)) return null;
        const user = await client.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user.password) return null;
        const isPassValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPassValid) return null;
        const { id, firstName, lastName, email } = user;
        return {
          id: String(id),
          email,
          firstName,
          lastName,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        const u = user as User;
        token.firstName = u.firstName;
        token.lastName = u.lastName;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }: any) {
      session.user.id = token.id;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
