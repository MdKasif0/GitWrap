"use server";

import { redirect } from "next/navigation";

export async function handleUsernameSubmit(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;

  if (!username || username.trim().length === 0) {
     return { message: "Username cannot be empty." };
  }
  
  // Validate username format (basic)
  const githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
  if (!githubUsernameRegex.test(username)) {
    return { message: "Invalid GitHub username format." };
  }

  redirect(`/wrapped/${username.trim()}`);
}
