"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logoSrc from "../../public/logo.png";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 flex flex-row items-center justify-between border-b border-stone-200 bg-white px-2 py-4 backdrop-blur-lg md:px-20">
      <Link
        href="/"
        className="flex flex-row items-center justify-center gap-2"
      >
        <Image src={logoSrc} alt="logo" height={30} width={30} />
        <span className="text-lg font-extrabold">QuiriPDF</span>
      </Link>

      {/* Desktop menu */}
      <div className="hidden space-x-1 sm:block">
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

      {/* Mobile menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="h-6 px-0 py-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:hidden"
            aria-label="Menu button"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetTitle className="sr-only"></SheetTitle>
        <SheetDescription className="sr-only"></SheetDescription>
        <SheetContent side={"right"} className="px-8 py-3">
          <ul className="mt-10 space-y-5 text-lg">
            <li>
              <Link
                href="/register"
                onClick={() => {
                  setOpen(false);
                }}
                className={cn(buttonVariants({ variant: "default" }), "w-full")}
              >
                Start for free
              </Link>
            </li>
            <li className="text-center">
              <Link
                href="/signin"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Sign In
              </Link>
            </li>
            <li className="text-center">
              <Link
                href="/price"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Price
              </Link>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
