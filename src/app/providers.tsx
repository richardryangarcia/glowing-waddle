"use client";

import { SmartAccountProvider } from "@/contexts/SmartAccountContext";
import { PrivyProvider } from "@privy-io/react-auth";
import { ReactNode, useEffect, useState } from "react";
import { baseSepolia } from "viem/chains";

export const Providers = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);

  const onPrivyLoginSuccess = (user: any) => {
    console.log(`User ${user.id} logged in!`);
  };

  return (
    <PrivyProvider
      appId={"clpispdty00ycl80fpueukbhl"}
      onSuccess={onPrivyLoginSuccess}
      config={{
        defaultChain: baseSepolia,
        loginMethods: ["email", "wallet", "sms", "google", "apple", "twitter"],
        appearance: {
          theme: "dark",
          accentColor: "#6C32F1",
          logo: "https://cfcdn.apowersoft.info/astro/picwish/_astro/scene-logo-after.310a7581.png",
        },
      }}
    >
      <SmartAccountProvider>{mounted && children}</SmartAccountProvider>
    </PrivyProvider>
  );
};
