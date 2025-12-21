import { Logo } from "./logo";

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center p-4">
      <Logo />
    </header>
  );
}
