import Link from "next/link";
import { ReactNode } from "react";
import { ModeToggle } from "./ModeToggle";

export default function Navbar(): ReactNode {
  return (
    <nav className="w-full relative flex items-center justify-between max-w-2xl mx-auto  py-5">
      <Link href="/" className="font-bold text-3xl">
        Pablo <span className="text-primary">Blog</span>
      </Link>
      <ModeToggle />
    </nav>
  );
}
