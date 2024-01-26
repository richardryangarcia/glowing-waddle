"use client";

import { usePrivy } from "@privy-io/react-auth";
import { PrivyLoginButton } from "../Buttons/PrivyLoginButton";
import { PrivyLogoutButton } from "../Buttons/PrivyLogoutButton";
import { PrivyAccountCard } from "../Cards/PrivyAccountCard";
import { NewForm } from "../Forms/NewForm";

export const Privy = () => {
  const { login, connectWallet, ready, authenticated, user, logout } =
    usePrivy();
  return (
    <>
      {ready && (
        <div>
          {authenticated && user ? (
            <div>
              <PrivyLogoutButton handleClick={logout} />
              <PrivyAccountCard />
            </div>
          ) : (
            <div>
              <PrivyLoginButton handleClick={login} />
              <div className="mt-6">Login to see account addresses</div>
            </div>
          )}
        </div>
      )}

      {/* <NewForm /> */}
    </>
  );
};
