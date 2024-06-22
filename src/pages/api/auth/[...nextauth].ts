import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcrypt";

// Extend the built-in session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

const users: User[] = [];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        if (req.body?.isRegister === "true") {
          // Registration logic
          if (!credentials.name) {
            throw new Error("Name is required for registration");
          }

          const existingUser = users.find(
            (user) => user.email === credentials.email
          );
          if (existingUser) {
            throw new Error("User already exists");
          }

          const hashedPassword = await hash(credentials.password, 10);
          const newUser: User = {
            id: Date.now().toString(),
            name: credentials.name,
            email: credentials.email,
            password: hashedPassword,
          };
          users.push(newUser);
          return { id: newUser.id, name: newUser.name, email: newUser.email };
        } else {
          // Login logic
          const user = users.find((user) => user.email === credentials.email);
          if (!user) {
            throw new Error("No user found");
          }

          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return { id: user.id, name: user.name, email: user.email };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },
};

export default NextAuth(authOptions);
