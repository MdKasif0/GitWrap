import { Logo } from "./logo";
import { ShareButton } from "./share-button";

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center">
      <Logo />
      <ShareButton />
    </header>
  );
}
