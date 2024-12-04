import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

interface SignInButtonProps {
  text: string;
  provider: string;
}

export default function SignInButton({
  text,
  provider,
  ...props
}: SignInButtonProps & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider, { redirectTo: "/dashboard" });
      }}
    >
      <Button {...props}>{text}</Button>
    </form>
  );
}
