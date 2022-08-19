import React, { useCallback } from "react";
import { Chain, CHAINS } from "../../consts/chains";
import { ChainAggregatedElement } from "./ChainAggregatedElement";
import { Token } from "../../consts/tokens";

export function ChainAggregatedElements({
  tokens,
  totalBalance,
}: {
  tokens: Token[];
  totalBalance: number;
}): JSX.Element {
  const getChainBalance = useCallback(
    (chain: any) => {
      const filtered = tokens
        .filter((token: Token) => token.chain === chain)
        .map((token: Token) => token.total);
      if (filtered.length > 0) {
        return filtered.reduce((a, b) => (a ?? 0) + (b ?? 0)) ?? 0;
      } else {
        return 0;
      }
    },
    [tokens]
  );

  return (
    <>
      <div className={"m-5 shadow-xl bg-white p-5 rounded-xl flex flex-col"}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
          {Object.keys(CHAINS)
            //@ts-ignore
            .map((chainKey) => CHAINS[chainKey])
            //@ts-ignore
            .sort((a: Chain, b: Chain) => {
              return getChainBalance(a) < getChainBalance(b);
            })
            .map((chain) => (
              <ChainAggregatedElement
                key={chain.provider.network.name}
                chain={chain}
                balance={getChainBalance(chain)}
                totalBalance={totalBalance}
              />
            ))}
        </div>
      </div>
    </>
  );
}
