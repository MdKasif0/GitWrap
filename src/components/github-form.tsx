"use client";

import { useFormStatus } from "react-dom";
import { handleUsernameSubmit } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Github, LoaderCircle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <Github />
      )}
      <span>{pending ? "Generating..." : "Wrap My Year"}</span>
    </Button>
  );
}

export function GithubForm() {
  return (
    <form
      action={handleUsernameSubmit}
      className="w-full max-w-sm"
    >
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="relative w-full">
            <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="username"
              type="text"
              placeholder="Enter your GitHub username"
              className="w-full pl-10"
              required
            />
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
