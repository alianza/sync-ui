"use server";

export async function createContact(prevState: unknown, formData: FormData) {
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  console.log(`rawFormData`, rawFormData);

  // Send the form data to the API or email service
  await new Promise((resolve) => setTimeout(() => resolve("resolved"), 1000)); // Simulate a delay

  // revalidatePath("/pricing");

  return {
    message:
      "Your message has been sent successfully! Thank you, We will get back to you soon!",
  };
}
