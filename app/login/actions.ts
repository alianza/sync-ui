"use server";

export async function login(prevState: unknown, formData: FormData) {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  console.log(`rawFormData`, rawFormData);

  // Send the form data to the API or email service
  await new Promise((resolve) => setTimeout(() => resolve("resolved"), 1000)); // Simulate a delay

  // revalidatePath("/pricing");

  return {
    message: `Received the form data: ${JSON.stringify(rawFormData, null, 2)}`,
  };
}
