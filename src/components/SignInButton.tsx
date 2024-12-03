import { Button } from "@/components/ui/button";
import { signInHandler } from "@/lib/sign-in";

interface SignInButtonProps {
  text: string;
  provider: string | undefined;
}

export default function SignInButton({
  text,
  provider,
  ...props
}: SignInButtonProps & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form action={() => signInHandler(provider)}>
      <Button {...props}>{text}</Button>
    </form>
  );
}
