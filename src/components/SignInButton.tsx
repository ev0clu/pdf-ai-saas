import { handleSignIn } from "@/actions/sign";
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
    <form action={() => handleSignIn(provider, "/dashboard")}>
      <Button {...props}>{text}</Button>
    </form>
  );
}
