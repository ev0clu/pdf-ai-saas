import { signInAction } from "@/app/actions/action";
import { Button } from "@/components/ui/button";

export default function SignInButton({
  provider,
  text,
  ...props
}: { provider?: string; text: string } & React.ComponentPropsWithRef<
  typeof Button
>) {
  return (
    <form action={() => signInAction(provider)}>
      <Button {...props}>{text}</Button>
    </form>
  );
}
