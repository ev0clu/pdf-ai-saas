import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound, Sparkles } from "lucide-react";
import SignOutButton from "./SignOutButton";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

interface ProfileButtonProps {
  name: string | null | undefined;
  email: string | null | undefined;
  profileImgSrc: string | null | undefined;
  plan: "FREE" | "PRO" | null | undefined;
}

const ProfileButton = ({
  name,
  email,
  profileImgSrc,
  plan,
}: ProfileButtonProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {profileImgSrc ? (
            <Image
              src={profileImgSrc}
              alt="Google profile image"
              width={35}
              height={35}
              className="rounded-full"
            />
          ) : (
            <CircleUserRound
              strokeWidth={1}
              className="h-[35px] w-[35px] rounded-full hover:bg-primary-foreground hover:text-primary"
            />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-muted-foreground">
            {name}
          </DropdownMenuLabel>
          <DropdownMenuLabel className="font-normal text-muted-foreground">
            {email}
          </DropdownMenuLabel>
          <DropdownMenuLabel className="flex flex-row gap-2 font-normal text-muted-foreground">
            <span>{plan === "FREE" ? "Free" : "Pro"} Plan</span>
            <span>
              {plan === "PRO" && (
                <Sparkles className="h-5 w-5 text-yellow-500" />
              )}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="mx-2" />
          <DropdownMenuItem>
            <Link
              className={cn(buttonVariants({ variant: "ghost" }), "w-full")}
              href="/subscription"
            >
              Manage Subscription
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOutButton
              variant={"default"}
              className="w-full"
              text="Sign out"
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileButton;
