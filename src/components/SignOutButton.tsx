import { signOutAction } from "@/app/actions/action";
import { Button } from "@/components/ui/button";

export default function SignOutButton({
  text,
  ...props
}: { text: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form action={() => signOutAction()}>
      <Button {...props}>{text}</Button>
    </form>
  );
}
