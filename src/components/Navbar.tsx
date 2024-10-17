import Image from "next/image";
import Link from "next/link";
import logoSrc from "../../public/logo.png";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 flex flex-row items-center justify-between border-b border-stone-200 bg-white px-2 py-4 backdrop-blur-lg md:px-20">
      <Link
        href="/"
        className="flex flex-row items-center justify-center gap-2"
      >
        <Image src={logoSrc} alt="logo" height={30} width={30} />
        <span className="text-lg font-extrabold">QuiriPDF</span>
      </Link>
      <div className="space-x-1">
        <Button asChild variant={"ghost"}>
          <Link href="/price">Price</Link>
        </Button>
        <Button asChild variant={"ghost"}>
          <Link href="/signin">Sign In</Link>
        </Button>
        <Button asChild variant={"default"}>
          <Link href="/register">Start for free</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
