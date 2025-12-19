"use server";

import { redirect } from "next/navigation";

export async function handleUsernameSubmit(formData: FormData) {
  const username = formData.get("username") as string;

  if (!username || username.trim().length === 0) {
    // In a real app you might want to return an error state.
    // For now, we just won't redirect.
    return;
  }

  redirect(`/wrapped/${username.trim()}`);
}
