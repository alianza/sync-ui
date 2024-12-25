import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import User from "@/models/User";
import { UserDoc } from "@/models/User.type";
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
      role: string;
    } & DefaultSession["user"]; // Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} }, // You can specify which fields should be submitted, by adding keys to the `credentials` object. e.g. domain, username, password, 2FA token, etc.
      authorize: async (credentials) => {
        const user = await getUserFromDb(credentials.email?.toString() || "", credentials.password?.toString() || "");

        // console.log(`user`, user);

        if (!user) {
          throw new Error("Invalid credentials."); // No user found, so this is their first attempt to login. Optionally, this is also the place you could do a user registration
        }

        return {
          id: user._id,
          email: user.email,
          role: user.role,
          token: "hello",
          // alias: `${user.firstName}+${user.lastName}`,
          name: `${user.firstName}+${user.lastName}`,
        }; // return user object with their profile data
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
        const dbUser = (await User.findOne({ email: token.email }).select("role").lean()) as {
          _id: string;
          role: string;
          __v: number;
        };
        token.account = dbUser;
        token.role = dbUser.role;
        token.id = dbUser._id.toString();
      } else {
        const dbUser = token.account as UserDoc;
        token.role = dbUser.role;
        token.id = dbUser._id;
      }

      return token;
    },
    session({ session, token, user }) {
      session.user.id = token.sub as string;
      session.user.role = token.role as string;
      return session;
    },
  },
});

async function getUserFromDb(email: string, password: string) {
  await dbConnect();
  const user = (await User.findOne<UserDoc>({ email }).select("+password").lean()) as UserDoc & { password: string };

  if (!user) return null;

  const isMatch = await verifyPassword(password, user.password);
  return isMatch ? user : null;
}
