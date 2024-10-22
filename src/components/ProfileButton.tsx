import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import SignOutButton from "./SignOutButton";

interface ProfileButtonProps {
  name: string | null | undefined;
  email: string | null | undefined;
  profileImgSrc: string | null | undefined;
}

const ProfileButton = ({ name, email, profileImgSrc }: ProfileButtonProps) => {
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
          <DropdownMenuSeparator className="mx-2" />
          <DropdownMenuItem>
            <SignOutButton variant={"default"} text="Sign out" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileButton;
