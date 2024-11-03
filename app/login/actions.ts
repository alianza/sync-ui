"use server";

import { signIn, signOut } from "@/auth";

// export async function login(prevState: unknown, formData: FormData) {
//   const rawFormData = {
//     email: formData.get("email"),
//     password: formData.get("password"),
//   };
//
//   console.log(`rawFormData`, rawFormData);
//
//   // Send the form data to the API or email service
//   try {
//     const user = await signIn("credentials", formData);
//     const session = await auth();
//     console.log(`session`, session);
//     console.log(`user`, user);
//     return {
//       message: `Successfully logged in!`,
//     };
//   } catch (error) {
//     return {
//       message: `Invalid credentials. Please try again.`,
//     };
//   }
//
//   // revalidatePath("/pricing");
//
//   return {
//     message: `Received the form data: ${JSON.stringify(rawFormData, null, 2)}`,
//   };
// }

export async function signInAction(formData: FormData) {
  // try {
  //   const user = await signIn("credentials", formData);
  //
  //   console.log(`actionUser`, user);
  //
  //   return user;
  // } catch (error) {
  //   return {
  //     message: `Invalid credentials. Please try again.`,
  //   };
  // }
  return signIn("credentials", formData);
}

export async function signOutAction() {
  return signOut();
}
