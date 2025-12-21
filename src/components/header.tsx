import { Button } from "./ui/button";
import { Logo } from "./logo";
import Link from "next/link";
import { Coffee } from "lucide-react";

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center">
      <Logo />
      <div className="flex items-center gap-2">
         <Button variant="outline" asChild className="border-primary/50 bg-transparent hover:bg-primary/10 transition-colors duration-300">
          <Link href="/support" aria-label="Support page">
            <Coffee className="text-primary" />
            <span className="ml-2 bg-gradient-to-r from-green-400 to-primary bg-clip-text text-transparent font-semibold">
              Support
            </span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
