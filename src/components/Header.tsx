import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import logoSrc from "../../public/logo.png";
import { Menu as MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";

const Header = async () => {
  const session = await auth();
  console.log(session);
  return (
    <header className="sticky top-0 flex flex-row items-center justify-between border-b border-stone-200 bg-white px-2 py-4 backdrop-blur-lg md:px-20">
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
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "font-extrabold",
            )}
          >
            Dashboard
          </Link>
        </li>
        <li>
          {session?.user ? (
            <SignInButton
              variant={"default"}
              provider="google"
              text="Sign in"
            />
          ) : (
            <SignOutButton variant={"default"} text="Sign out" />
          )}
        </li>
      </ul>

      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="h-6 px-0 py-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:hidden"
            aria-label="Menu button"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetTitle className="sr-only"></SheetTitle>
        <SheetDescription className="sr-only"></SheetDescription>
        <SheetContent side={"right"} className="px-8 py-3">
          <ul className="mt-10 space-y-5 text-lg">
            <li>
              <SheetClose asChild>
                {session?.user && (
                  <Link
                    href="/dashboard"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full text-lg font-extrabold",
                    )}
                  >
                    Dashboard
                  </Link>
                )}
              </SheetClose>
            </li>
            <li className="text-center">
              <SheetClose asChild>
                <Link
                  href="/pricing"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full text-lg font-extrabold",
                  )}
                >
                  Pricing
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                {session?.user ? (
                  <SignInButton
                    variant={"default"}
                    provider="google"
                    text="Sign in"
                    className="w-full text-lg"
                  />
                ) : (
                  <SignOutButton
                    variant={"default"}
                    text="Sign out"
                    className="w-full text-lg"
                  />
                )}
              </SheetClose>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
