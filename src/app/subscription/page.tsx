import { auth } from "@/auth";
import ContainerWrapper from "@/components/ContainerWrapper";
import Billing from "./_components/Billing";
import { getSubscriptionInformations } from "@/lib/stripe";
import ErrorWrapper from "@/components/ErrorWrapper";

const ManageSubscription = async () => {
  const session = await auth();
  const subscriptionInformations = await getSubscriptionInformations(
    session?.user.id,
  );

  return (
    <ContainerWrapper className="items-center">
      {subscriptionInformations === null ? (
        <ErrorWrapper text="User not found" />
      ) : (
        <Billing subscriptionInformations={subscriptionInformations} />
      )}
    </ContainerWrapper>
  );
};

export default ManageSubscription;
