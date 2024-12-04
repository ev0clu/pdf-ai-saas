import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

interface SignOutButtonProps {
  text: string;
}

export default function SignOutButton({
  text,
  ...props
}: SignOutButtonProps & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
      className="w-full"
    >
      <Button {...props}>{text}</Button>
    </form>
  );
}
