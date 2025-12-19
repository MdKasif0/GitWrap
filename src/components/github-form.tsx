"use client";

import { useFormStatus } from "react-dom";
import { handleUsernameSubmit } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Github, LoaderCircle, ArrowRight } from "lucide-react";
import { useEffect, useRef, useActionState } from "react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="w-full bg-white/10 text-white backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
      size="lg"
    >
      {pending ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <>
          <span>Wrap My Year</span>
          <ArrowRight />
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
      className="w-full max-w-md space-y-4"
    >
      <div className="relative w-full">
          <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="username"
            type="text"
            placeholder="Enter your GitHub username"
            className="w-full h-14 pl-12 pr-4 text-lg bg-white/10 text-white placeholder:text-white/50 backdrop-blur-lg border border-white/20 focus:ring-2 focus:ring-primary/50"
            required
            autoFocus
          />
      </div>
      <SubmitButton />
    </form>
  );
}
