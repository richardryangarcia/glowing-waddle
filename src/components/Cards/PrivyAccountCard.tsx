"use client";

import { BASE_SEPOLIA_SCAN_URL, NFT_ADDRESS } from "@/constants";
import { ABI } from "@/constants/abis/NFT";
import { useSmartAccount } from "@/contexts/SmartAccountContext";
import { Hex } from "@alchemy/aa-core";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useState } from "react";
import { encodeFunctionData } from "viem/utils";

export const PrivyAccountCard = () => {
  const { connectWallet, ready, authenticated, user } = usePrivy();
  const { wallets } = useWallets();

  const {
    smartAccountAddress,
    smartAccountProvider,
    sendSponsoredUserOperation,
    eoa,
  } = useSmartAccount();

  const [transactionLink, setTransactionLink] = useState<JSX.Element | null>(
    null
  );

  const onMint = async () => {
    // The mint button is disabled if either of these are undefined
    if (!smartAccountProvider || !smartAccountAddress || !eoa) return;

    try {
      // From a viem `RpcTransactionRequest` (e.g. calling an ERC-721's `mint` method),
      // build and send a user operation. Gas fees will be sponsored by the Base Paymaster.
      console.log("before");
      const userOpHash = await sendSponsoredUserOperation({
        from: smartAccountAddress,
        to: NFT_ADDRESS,
        data: encodeFunctionData({
          abi: ABI,
          functionName: "mint",
          args: [eoa.address as Hex],
        }),
      });

      console.log("after send");

      // Once we have a hash for the user operation, watch it until the transaction has
      // been confirmed.
      const transactionHash =
        await smartAccountProvider.waitForUserOperationTransaction(userOpHash);
      console.log("after wait");

      setTransactionLink(
        <a href={`${BASE_SEPOLIA_SCAN_URL}/tx/${transactionHash}`}>
          Successfully minted! Click here to see your transaction.
        </a>
      );
    } catch (error) {
      setTransactionLink(<div>{"Mint failed with error: " + error}</div>);
    }
  };

  return (
    <>
      <div className="flex flex-col mt-6">
        <div> Smart account: {smartAccountAddress}</div>

        <div> External account: {eoa?.address}</div>
      </div>

      <div className="mt-40">
        <button
          onClick={onMint}
          className="rounded-md bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700 disabled:bg-violet-400"
          disabled={!smartAccountProvider || !smartAccountAddress}
        >
          Mint NFT
        </button>

        {transactionLink && (
          <div className="border border-red-500 w-96 overflow-scroll p-4 rounded-md mt-4">
            {transactionLink}
          </div>
        )}
      </div>
    </>
  );
};
