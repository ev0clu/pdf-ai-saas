import { handleSignOut } from "@/actions/sign";
import { Button } from "@/components/ui/button";

interface SignOutButtonProps {
  text: string;
}

export default function SignOutButton({
  text,
  ...props
}: SignOutButtonProps & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form action={() => handleSignOut("/")} className="w-full">
      <Button {...props}>{text}</Button>
    </form>
  );
}
