import React, { createContext, useMemo, useState } from "react";
import { Token } from "../consts/tokens";
import { Helmet } from "react-helmet";
import { ChainAggregatedElements } from "../components/portfolio/ChainAggregatedElements";
import Balance from "../components/portfolio/Balance";
import { Tokens } from "../components/portfolio/Tokens";

const { getCoingeckoPrice } = require("../helper/CoinGeckoHelper");
const { getBalance } = require("../helper/EthersHelper");

export const TotalBalanceContext = createContext(0);

type WalletProps = {
  address: string;
};
export default function Portfolio({ address }: WalletProps) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [lps, setLPs] = useState([]);
  const [farms, setFarms] = useState([]);
  const totalBalance = useMemo(() => {
    return (
      tokens
        .map((token) => token.total)
        .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0
    );
  }, [tokens]);

  // @ts-ignore
  return (
    <>
      <Helmet>
        <title>Token Glass - Portfolio</title>
      </Helmet>
      <div className={"p-10"}>
        <div className="container mx-auto">
          <div className="flex flex-row">
            <div className="flex flex-col">
              <h1 className={"font-bold text-6xl"}>Portfolio</h1>
            </div>
          </div>
          {address ? (
            <div className={"flex flex-row flex-wrap"}>
              <div className="w-full lg:w-1/2">
                <div
                  className={
                    "m-5 shadow-xl bg-white p-5 rounded-xl flex flex-col"
                  }
                >
                  <Balance totalBalance={totalBalance} />
                </div>
                <div className="m-5 shadow-xl bg-white p-5 rounded-xl flex flex-col">
                  <Tokens
                    address={address}
                    setTokens={setTokens}
                    tokens={tokens}
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div
                  className={
                    "m-5 shadow-xl bg-white p-5 rounded-xl flex flex-col"
                  }
                >
                  <ChainAggregatedElements
                    tokens={tokens}
                    totalBalance={totalBalance}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div
              className={"mt-5 shadow-xl bg-white p-5 rounded-xl flex flex-col"}
            >
              <p>
                Please <strong>connect your Metamask</strong> to TokenGlass to
                view your portfolio.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
