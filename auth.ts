import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import User, { UserType } from "@/models/User";
import { ROLES } from "@/models/User.type";
import dbConnect from "./lib/dbConnect";

export async function saltAndHashPassword(password: string) {
  const saltLength = 10;
  const salt = bcryptjs.genSaltSync(saltLength);
  return bcryptjs.hashSync(password, salt);
}

export const verifyPassword = async (password: string, hash: string) => bcryptjs.compareSync(password, hash);

declare module "next-auth" {
  interface Session {
    user: {
      role: ROLES;
    } & DefaultSession["user"]; // Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} }, // You can specify which fields should be submitted, by adding keys to the `credentials` object. e.g. domain, username, password, 2FA token, etc.
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required."); // If credentials are not provided, throw an error
        }

        const user = await getUserFromDb(credentials.email?.toString() || "", credentials.password?.toString() || "");

        if (!user) {
          throw new Error("Invalid credentials."); // No user found, so this is their first attempt to login. Optionally, this is also the place you could do a user registration
        }

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          // alias: `${user.firstName}+${user.lastName}`,
          name: `${user.firstName}+${user.lastName}`,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // User is available during sign-in
      }

      if (!token.account) {
        await dbConnect();
        const dbUser = await User.findOne({ email: token.email }).select("role").lean();
        if (!dbUser) {
          throw new Error("User not found in database.");
        }
        token.account = dbUser;
        token.role = dbUser.role;
        token.id = dbUser._id.toString();
      } else {
        const dbUser = token.account as UserType;
        token.role = dbUser.role;
        token.id = dbUser._id;
      }

      return token;
    },
    session({ session, token, user }) {
      session.user.id = token.sub as string;
      session.user.role = token.role as ROLES;
      return session;
    },
  },
});

async function getUserFromDb(email: string, password: string) {
  await dbConnect();
  const user = await User.findOne({ email }).select("+password").lean();

  if (!user) return null;

  const isMatch = await verifyPassword(password, user.password);
  return isMatch ? user : null;
}
