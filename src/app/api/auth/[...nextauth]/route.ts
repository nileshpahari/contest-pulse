import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
  ],
});

export { handler as GET, handler as POST };
