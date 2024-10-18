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
import SignInButton from "./SignInButton";

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
      <ul className="hidden flex-row gap-1 sm:flex">
        <li>
          <Link
            href="/pricing"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "font-extrabold",
            )}
          >
            Pricing
          </Link>
        </li>
        <li>
          <SignInButton variant={"ghost"} provider="google" text="Sign in" />
        </li>
        <li>
          <SignInButton
            variant={"default"}
            provider="google"
            text="Start for free"
          />
        </li>
      </ul>

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
              <SignInButton
                variant={"default"}
                provider="google"
                text="Start for free"
                className="w-full text-lg"
              />
            </li>
            <li className="text-center">
              <SignInButton
                variant={"ghost"}
                provider="google"
                text="Sign in"
                onClick={() => {
                  setOpen(false);
                }}
                className="text-lg"
              />
            </li>
            <li className="text-center">
              <Link
                href="/pricing"
                onClick={() => {
                  setOpen(false);
                }}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-lg font-extrabold",
                )}
              >
                Pricing
              </Link>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
