import React, { createContext, useCallback, useEffect, useState } from "react";
import { TokenRow } from "../components/TokenRow";
import { Token, TOKENS } from "../consts/tokens";
import { BigNumber, ethers } from "ethers";
import { Chain, CHAINS } from "../consts/chains";
import { ChainAggregatedElement } from "../components/ChainAggregatedElement";

const { getCoingeckoPrice } = require("../helper/CoinGeckoHelper");
const { getBalance } = require("../helper/EthersHelper");

export const TotalBalanceContext = createContext(0);

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
        return filtered.reduce((a, b) => (a ?? 0) + (b ?? 0)) ?? 0;
      } else {
        return 0;
      }
    },
    [tokensWithBalancePriceAndTotal]
  );

  const balances = {
    ARBITRUM: getChainBalance(CHAINS.ARBITRUM),
    AVALANCHE: getChainBalance(CHAINS.AVALANCHE),
    BNB: getChainBalance(CHAINS.BNB),
    ETHEREUM: getChainBalance(CHAINS.ETHEREUM),
    FANTOM: getChainBalance(CHAINS.FANTOM),
    FUSE: getChainBalance(CHAINS.FUSE),
    HARMONY: getChainBalance(CHAINS.HARMONY),
    HOO: getChainBalance(CHAINS.HOO),
    HUOBI: getChainBalance(CHAINS.HUOBI),
    IOTEX: getChainBalance(CHAINS.IOTEX),
    KUCOIN: getChainBalance(CHAINS.KUCOIN),
    METER: getChainBalance(CHAINS.METER),
    ANDROMEDA: getChainBalance(CHAINS.ANDROMEDA),
    MOONRIVER: getChainBalance(CHAINS.MOONRIVER),
    OKC: getChainBalance(CHAINS.OKC),
    OPTIMISM: getChainBalance(CHAINS.OPTIMISM),
    POLYGON: getChainBalance(CHAINS.POLYGON),
    THETA: getChainBalance(CHAINS.THETA),
    XDAI: getChainBalance(CHAINS.XDAI),
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
      // console.log(allResolved);
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
      console.log("Before batch");
      batch().then((r) => setLoadingState(null));
      console.log("After batch");
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

          <div className="grid grid-cols-5 bg-white shadow-2xl ">
            <ChainAggregatedElement
              chain={CHAINS.ANDROMEDA}
              balance={getChainBalance(CHAINS.ANDROMEDA)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.ARBITRUM}
              balance={getChainBalance(CHAINS.ARBITRUM)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.ANDROMEDA}
              balance={getChainBalance(CHAINS.ANDROMEDA)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.AVALANCHE}
              balance={getChainBalance(CHAINS.AVALANCHE)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.BNB}
              balance={getChainBalance(CHAINS.BNB)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.ETHEREUM}
              balance={getChainBalance(CHAINS.ETHEREUM)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.FANTOM}
              balance={getChainBalance(CHAINS.FANTOM)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.FUSE}
              balance={getChainBalance(CHAINS.FUSE)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.HARMONY}
              balance={getChainBalance(CHAINS.HARMONY)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.HOO}
              balance={getChainBalance(CHAINS.HOO)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.HUOBI}
              balance={getChainBalance(CHAINS.HUOBI)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.IOTEX}
              balance={getChainBalance(CHAINS.IOTEX)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.KUCOIN}
              balance={getChainBalance(CHAINS.KUCOIN)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.METER}
              balance={getChainBalance(CHAINS.METER)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.MOONRIVER}
              balance={getChainBalance(CHAINS.MOONRIVER)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.OKC}
              balance={getChainBalance(CHAINS.OKC)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.OPTIMISM}
              balance={getChainBalance(CHAINS.OPTIMISM)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.POLYGON}
              balance={getChainBalance(CHAINS.POLYGON)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.THETA}
              balance={getChainBalance(CHAINS.THETA)}
              totalBalance={totalBalance}
            />
            <ChainAggregatedElement
              chain={CHAINS.XDAI}
              balance={getChainBalance(CHAINS.XDAI)}
              totalBalance={totalBalance}
            />
          </div>

          <table className={"w-full bg-white shadow-2xl table"}>
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
