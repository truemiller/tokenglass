import { Chain } from "../../consts/chains";
import React from "react";

type ChainAggregatedElementProps = {
  chain: Chain;
  balance: number;
  totalBalance: number;
};

export const ChainAggregatedElement = ({
  chain,
  balance,
  totalBalance,
}: ChainAggregatedElementProps) => {
  return balance ? (
    <div className={"flex flex-row hover:bg-gray-100 p-3"}>
      <img
        src={chain.logo}
        alt=""
        style={{ width: 32, height: 32 }}
        className={"rounded-circle my-auto"}
      />
      <div className={"ml-2 flex flex-col"}>
        <span>{chain.provider.network.name}</span>
        <span className={"font-extrabold"}>${balance.toLocaleString()}</span>
        <span className={"text-sm"}>
          {((balance * 100) / totalBalance).toLocaleString()}%
        </span>
      </div>
    </div>
  ) : null;
};
