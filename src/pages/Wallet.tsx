import React, { useCallback, useEffect, useState } from "react";
import { TokenRow } from "../components/TokenRow";
import { Token, TOKENS } from "../consts/tokens";
import { BigNumber, ethers } from "ethers";
import { Chain, CHAINS } from "../consts/chains";

const { getCoingeckoPrice } = require("../helper/CoinGeckoHelper");
const { getBalance } = require("../helper/EthersHelper");

type WalletProps = {
  address: string;
};
export default function Wallet({ address }: WalletProps) {
  const [tokensWithBalance, setTokensWithBalance] = useState<Token[]>([]);
  const [tokensWithBalanceAndPrice, setTokensWithBalanceAndPrice] = useState<
    Token[]
  >([]);
  const [tokensWithBalancePriceAndTotal, setTokensWithBalancePriceAndTotal] =
    useState<Token[]>([]);
  const [
    sortedTokensWithBalancePriceAndTotal,
    setSortedTokensWithBalancePriceAndTotal,
  ] = useState<Token[]>([]);

  const [totalBalance, setTotalBalance] = useState<number>(0);

  const [loadingState, setLoadingState] = useState<string | null>(null);

  const getChainBalance = useCallback(
    (chain: any) => {
      const filtered = tokensWithBalancePriceAndTotal
        .filter((token: Token) => token.chain === chain)
        .map((token: Token) => token.total);
      if (filtered.length > 0) {
        return filtered.reduce((a, b) => (a ?? 0) + (b ?? 0));
      } else {
        return 0;
      }
    },
    [tokensWithBalancePriceAndTotal]
  );

  const balances = {
    avalanche: getChainBalance(CHAINS.AVALANCHE),
    bnb: getChainBalance(CHAINS.BNB),
    ethereum: getChainBalance(CHAINS.ETHEREUM),
    fantom: getChainBalance(CHAINS.FANTOM),
  };
  // update tokens with balance (setTokensWithBalance)
  useEffect(() => {
    setLoadingState("Getting tokens");
    const getTokens = async (chain: Chain) => {
      const batchSize = 200;
      let tokensInWallet;
      let allTokens = TOKENS.filter((token) => token.chain === chain);
      let runs = Math.ceil(allTokens.length / batchSize);
      let allResolved: Token[] = [];
      for (let x = 0; x < runs; x++) {
        tokensInWallet = allTokens.map(async (token, index) => {
          if (index + batchSize * x <= batchSize + batchSize * x) {
            if (ethers.utils.isAddress(token.address ?? "")) {
              token["balance"] = await getBalance(token, address)
                .then((r: any) => r)
                .catch((e: any) => e);
            } else {
              token["balance"] = await token.chain.provider
                .getBalance(address)
                .then((r) => r)
                .catch((e) => e);
            }
            const resolvedToken = await token;
            const balanceAsBN = BigNumber.from(token["balance"]);
            const balanceAsString = ethers.utils
              .formatEther(balanceAsBN)
              .toString();
            resolvedToken["balance"] = parseFloat(balanceAsString);
            // resolve all the promises
            return resolvedToken;
          }
        });
        let resolved = await Promise.all(tokensInWallet)
          .then((r) => r)
          .catch((e) => e);
        let filtered = resolved
          .filter((token: Token) => token)
          .filter((token: Token) => token["balance"] ?? 0 > 0);
        allResolved = [...allResolved, ...filtered];
      }
      console.log(allResolved);
      return allResolved;
    };

    const batch = async () => {
      let _tokensWithBalance: Token[] = [];
      for (let chainKey in CHAINS) {
        // @ts-ignore
        const chain: Chain = CHAINS[chainKey];
        const tokens = (await getTokens(chain)) ?? [];
        _tokensWithBalance = [..._tokensWithBalance, ...tokens];
        setTokensWithBalance(_tokensWithBalance);
      }
    };

    if (address) {
      batch().then((r) => setLoadingState(null));
    } else setTokensWithBalance([]);
  }, [address]);

  // update tokens with price (setTokensWithBalanceAndPrice)
  useEffect(() => {
    const tokensToUpdate = async () => {
      const ids = tokensWithBalance.map((token: Token) => token.coingecko);

      const idsSet = [...new Set(ids)];
      const idsString = idsSet.join(",");
      if (idsString.length > 0 && address && tokensWithBalance.length > 0) {
        const coinGeckoPrices = await getCoingeckoPrice(idsString);
        setTokensWithBalanceAndPrice(
          Object.keys(coinGeckoPrices).map((key: string) => {
            // @ts-ignore
            let token: Token = tokensWithBalance.find(
              (token: Token) => token["coingecko"] === key
            );
            token["price"] = coinGeckoPrices[key].usd;
            return token;
          })
        );
      } else {
        setTokensWithBalanceAndPrice([]);
      }
    };
    if (address) tokensToUpdate().then((r) => r);
  }, [address, tokensWithBalance]);

  // update tokens with totals (setTokensWithBalancePriceAndTotal)
  useEffect(() => {
    if (address) {
      setTokensWithBalancePriceAndTotal(
        tokensWithBalanceAndPrice.map((token) => {
          token["total"] = (token.price ?? 0) * (token.balance ?? 0);
          return token;
        })
      );
    } else {
      setTokensWithBalancePriceAndTotal([]);
    }
  }, [address, tokensWithBalanceAndPrice]);

  // sorted update tokens with totals
  useEffect(() => {
    setSortedTokensWithBalancePriceAndTotal(
      tokensWithBalancePriceAndTotal.sort(
        (a: Token, b: Token) => (b.total ?? 0) - (a.total ?? 0)
      )
    );
  }, [address, tokensWithBalancePriceAndTotal]);

  // update total balance
  useEffect(() => {
    if (address && tokensWithBalancePriceAndTotal.length > 0) {
      const sum =
        tokensWithBalancePriceAndTotal
          .map((token: Token) => token.total)
          .reduce((a, b) => (a ?? 0) + (b ?? 0)) ?? 0;
      setTotalBalance(sum);
    } else {
      setTotalBalance(0);
    }
  }, [address, tokensWithBalancePriceAndTotal]);

  return (
    <div className={"p-10"}>
      <div className="mx-auto container">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <h1 className={"font-extrabold text-6xl"}>Portfolio</h1>
          </div>
        </div>
        <div className={"mt-5 bg-white "}>
          <div className="flex">
            <span className={"font-extrabold text-xl"}>
              Balance: $ {totalBalance.toLocaleString()}
            </span>
          </div>

          <div className="p-3 grid grid-cols-5 gap-4 bg-white shadow-2xl ">
            {balances.avalanche ? (
              <div className={"flex flex-col text-sm text-center"}>
                <img
                  src={CHAINS.AVALANCHE.logo}
                  className={"w-8 mx-auto"}
                  alt={""}
                />
                <span className={""}>
                  {balances.avalanche.toLocaleString()}
                </span>
                <span>
                  {((balances.avalanche / totalBalance) * 100).toLocaleString()}
                  %
                </span>
              </div>
            ) : null}
            {balances.bnb ? (
              <div className={"flex flex-col text-sm"}>
                <img src={CHAINS.BNB.logo} className={"w-8"} alt={""} />
                <span>{balances.bnb.toLocaleString()}</span>
                <span>
                  {((balances.bnb / totalBalance) * 100).toLocaleString()}%
                </span>
              </div>
            ) : null}
            {balances.ethereum ? (
              <div className={"flex flex-col text-sm"}>
                <img src={CHAINS.ETHEREUM.logo} className={"w-8"} alt={""} />
                {balances.ethereum.toLocaleString()}
              </div>
            ) : null}
            {balances.fantom ? (
              <div className={"flex flex-col text-sm"}>
                <img src={CHAINS.FANTOM.logo} className={"w-8"} alt={""} />
                {balances.fantom.toLocaleString()}
              </div>
            ) : null}
          </div>

          <table className={"w-full  bg-white shadow-2xl table"}>
            <tbody>
              {sortedTokensWithBalancePriceAndTotal.map((token: any) => {
                return !token.balance ? (
                  <tr
                    key={
                      token.name + ":" + token.chain.provider.network.chainId
                    }
                  ></tr>
                ) : (
                  <TokenRow
                    key={
                      token.name + ":" + token.chain.provider.network.chainId
                    }
                    tokenData={token}
                  />
                );
              })}
            </tbody>
          </table>
          <div className="flex flex-row p-3 content-center">
            {loadingState ? (
              <img
                src="https://cutewallpaper.org/21/loading-gif-transparent-background/Free-Content-Discovery-Influencer-Marketing-Tool-Buzzsumo-.gif"
                alt=""
                className={"mx-auto"}
                height={16}
                style={{ height: 20, width: 20 }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
