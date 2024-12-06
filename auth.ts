import NextAuth from "next-auth";
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

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(`credentials`, credentials);

        // logic to salt and hash password
        // const pwHash = await saltAndHashPassword(credentials.password?.toString() || "");
        // console.log(`pwHash`, pwHash);

        const user = await getUserFromDb(credentials.email?.toString() || "", credentials.password?.toString() || "");

        console.log(`user`, user);

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }

        // return user object with their profile data
        return {
          id: user._id,
          email: user.email,
          // alias: `${user.firstName}+${user.lastName}`,
          name: `${user.firstName}+${user.lastName}`,
        };
      },
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
});
async function getUserFromDb(email: string, password: string) {
  await dbConnect();

  const user = (await User.findOne<UserDoc>({ email }).lean()) as UserDoc;

  if (!user) return null;

  const isMatch = await verifyPassword(password, user.password);

  if (!isMatch) return null;

  return user;
}
