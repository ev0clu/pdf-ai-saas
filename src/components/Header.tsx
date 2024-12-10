"use client";

import Image from "next/image";
import Link from "next/link";
import logoSrc from "../../public/logo.png";
import { CircleUserRound, Menu as MenuIcon, Sparkles } from "lucide-react";
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
import ProfileButton from "./ProfileButton";
import SignOutButton from "./SignOutButton";
import { useAppContext } from "./AppContext";

const Header = () => {
  const { subscriptionInformations, authSession } = useAppContext();

  return (
    <header className="sticky top-0 z-50 flex flex-row items-center justify-between border-b border-stone-200 bg-white px-2 py-4 backdrop-blur-lg md:px-20">
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
          {authSession && (
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "font-extrabold",
              )}
            >
              Dashboard
            </Link>
          )}
        </li>
        <li>
          {!authSession ? (
            <SignInButton
              variant={"default"}
              provider="google"
              text="Sign in"
            />
          ) : (
            <ProfileButton
              profileImgSrc={authSession.user?.image}
              name={authSession.user?.name}
              email={authSession.user?.email}
              plan={subscriptionInformations?.plan}
            />
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
          {/* Profile informaiton */}
          {authSession && (
            <>
              <div className="mt-10 flex w-full flex-row items-center gap-3">
                {authSession.user?.image ? (
                  <span className="h-[35px] w-[35px]">
                    <Image
                      src={authSession.user.image}
                      alt="Google profile image"
                      width={35}
                      height={35}
                      className="rounded-full"
                    />
                  </span>
                ) : (
                  <CircleUserRound
                    strokeWidth={1}
                    className="h-[35px] w-[35px] rounded-full hover:bg-primary-foreground hover:text-primary"
                  />
                )}
                <div>
                  <div className="text-sm font-semibold text-muted-foreground">
                    {authSession.user?.name}
                  </div>
                  <div className="text-sm font-normal text-muted-foreground">
                    {authSession.user?.email}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center text-sm font-normal text-muted-foreground">
                <span>
                  {subscriptionInformations?.isSubscribed ? "PRO" : "FREE"} Plan
                </span>
                <span>
                  {subscriptionInformations?.isSubscribed && (
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                  )}
                </span>
              </div>
              <div className="mt-5 h-[1px] w-full bg-gray-200"></div>
            </>
          )}

          {/* Menu */}
          <ul className="mt-5 space-y-5 text-lg">
            <li>
              <SheetClose asChild>
                {authSession && (
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
            <li className="text-center">
              <SheetClose asChild>
                <Link
                  href="/subscription"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full text-lg font-extrabold",
                  )}
                >
                  Manage Subscription
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                {!authSession ? (
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
