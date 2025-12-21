import { Button } from "./ui/button";
import { Logo } from "./logo";
import Link from "next/link";
import { Coffee } from "lucide-react";

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center">
      <Logo />
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/support" aria-label="Support page">
            <Coffee />
          </Link>
        </Button>
      </div>
    </header>
  );
}
