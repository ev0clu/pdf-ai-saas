"use client";

import React, { createContext, type ReactNode, useContext } from "react";
import type { getSubscriptionInformations } from "@/lib/stripe";
import type { Session } from "next-auth";

type AppContextType = {
  subscriptionInformations: Awaited<
    ReturnType<typeof getSubscriptionInformations>
  >;
  authSession: Awaited<Session | null>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider: React.FC<{
  children: ReactNode;
  subscriptionInformations: Awaited<
    ReturnType<typeof getSubscriptionInformations>
  >;
  authSession: Awaited<Session | null>;
}> = ({ children, subscriptionInformations, authSession }) => {
  return (
    <AppContext.Provider value={{ subscriptionInformations, authSession }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export default AppContextProvider;
