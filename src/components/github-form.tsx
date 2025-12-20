"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button 
      type="submit" 
      disabled={isPending} 
      className="w-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] px-8 text-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50"
      size="lg"
    >
      {isPending ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <>
          <span>Unwrap Your Year 🎁</span>
        </>
      )}
    </Button>
  );
}

export function GithubForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const [username, setUsername] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!username || username.trim().length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Username cannot be empty.",
      });
      return;
    }

    const githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    if (!githubUsernameRegex.test(username)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid GitHub username format.",
      });
      return;
    }

    setIsPending(true);
    router.push(`/wrapped/${username.trim()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md flex flex-col gap-4"
    >
      <div className="w-full rounded-full bg-white/10 p-1 text-white shadow-lg backdrop-blur-lg border border-white/20 focus-within:border-white/50 transition-all duration-300">
        <Input
          name="username"
          type="text"
          placeholder="Enter GitHub Username"
          className="h-12 w-full flex-grow border-none bg-transparent pl-6 text-lg text-white placeholder:text-white/50 focus-visible:ring-0"
          required
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <SubmitButton isPending={isPending} />
    </form>
  );
}
