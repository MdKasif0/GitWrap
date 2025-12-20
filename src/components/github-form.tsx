"use client";

import { useFormStatus } from "react-dom";
import { handleUsernameSubmit } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef, useActionState } from "react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="w-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] px-8 text-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50"
      size="lg"
    >
      {pending ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <>
          <span>Unwrap Your Year 🎁</span>
        </>
      )}
    </Button>
  );
}

const initialState = {
  message: "",
};

export function GithubForm() {
  const [state, formAction] = useActionState(handleUsernameSubmit, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form
      ref={formRef}
      action={formAction}
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
        />
      </div>
      <SubmitButton />
    </form>
  );
}
