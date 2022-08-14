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
export default function Dashboard({ address }: WalletProps) {
  const [avalanceTokensWithBalance, setAvalancheTokensWithBalance] = useState<
    Token[]
  >([]);
  const [bnbTokensWithBalance, setBnbTokensWithBalance] = useState<Token[]>([]);
  const [fantomTokensWithBalance, setFantomTokensWithBalance] = useState<
    Token[]
  >([]);
  const [ethereumTokensWithBalance, setEthereumTokensWithBalance] = useState<
    Token[]
  >([]);
  const [iotexTokensWithBalance, setIotexTokensWithBalance] = useState<Token[]>(
    []
  );
  const [moonriverTokensWithBalance, setMoonriverTokensWithBalance] = useState<
    Token[]
  >([]);
  const [arbitrumTokensWithBalance, setArbitrumTokensWithBalance] = useState<
    Token[]
  >([]);
  const [fuseTokensWithBalance, setFuseTokensWithBalance] = useState<Token[]>(
    []
  );
  const [harmonyTokensWithBalance, setHarmonyTokensWithBalance] = useState<
    Token[]
  >([]);
  const [hooTokensWithBalance, setHooTokensWithBalance] = useState<Token[]>([]);
  const [kucoinTokensWithBalance, setKucoinTokensWithBalance] = useState<
    Token[]
  >([]);
  const [meterTokensWithBalance, setMeterTokensWithBalance] = useState<Token[]>(
    []
  );
  const [andromedaTokensWithBalance, setAndromedaTokensWithBalance] = useState<
    Token[]
  >([]);
  const [okcTokensWithBalance, setOkcTokensWithBalance] = useState<Token[]>([]);
  const [optimismTokensWithBalance, setOptimismTokensWithBalance] = useState<
    Token[]
  >([]);
  const [xdaiTokensWithBalance, setXdaiTokensWithBalance] = useState<Token[]>(
    []
  );
  const [polygonTokensWithBalance, setPolygonTokensWithBalance] = useState<
    Token[]
  >([]);
  const [thetaTokensWithBalance, setThetaTokensWithBalance] = useState<Token[]>(
    []
  );

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
          // eslint-disable-next-line no-self-compare
          .filter((token: Token) => token["balance"] ?? 0 > 0);
        allResolved = [...allResolved, ...filtered];
      }
      // console.log(allResolved);
      return allResolved;
    };

    const batch = async (chain: Chain) => {
      let _tokensWithBalance: Token[] = [];
      const tokens = (await getTokens(chain)) ?? [];
      _tokensWithBalance = [..._tokensWithBalance, ...tokens];
      return _tokensWithBalance;
    };

    if (address) {
      batch(CHAINS.AVALANCHE).then((r) => setAvalancheTokensWithBalance(r));
      batch(CHAINS.ARBITRUM).then((r) => setArbitrumTokensWithBalance(r));
      batch(CHAINS.BNB).then((r) => setBnbTokensWithBalance(r));
      batch(CHAINS.FANTOM).then((r) => setFantomTokensWithBalance(r));
      batch(CHAINS.ETHEREUM).then((r) => setEthereumTokensWithBalance(r));
      batch(CHAINS.IOTEX).then((r) => setIotexTokensWithBalance(r));
      batch(CHAINS.MOONRIVER).then((r) => setMoonriverTokensWithBalance(r));
      batch(CHAINS.FUSE).then((r) => setFuseTokensWithBalance(r));
      batch(CHAINS.HARMONY).then((r) => setHarmonyTokensWithBalance(r));
      batch(CHAINS.HOO).then((r) => setHooTokensWithBalance(r));
      batch(CHAINS.KUCOIN).then((r) => setKucoinTokensWithBalance(r));
      batch(CHAINS.METER).then((r) => setMeterTokensWithBalance(r));
      batch(CHAINS.ANDROMEDA).then((r) => setAndromedaTokensWithBalance(r));
      batch(CHAINS.OKC).then((r) => setOkcTokensWithBalance(r));
      batch(CHAINS.OPTIMISM).then((r) => setOptimismTokensWithBalance(r));
      batch(CHAINS.POLYGON).then((r) => setPolygonTokensWithBalance(r));
      batch(CHAINS.THETA).then((r) => setThetaTokensWithBalance(r));
      batch(CHAINS.XDAI).then((r) => setXdaiTokensWithBalance(r));
    } else {
      setAvalancheTokensWithBalance([]);
      setFantomTokensWithBalance([]);
      setBnbTokensWithBalance([]);
      setEthereumTokensWithBalance([]);
      setIotexTokensWithBalance([]);
      setMoonriverTokensWithBalance([]);
      setFuseTokensWithBalance([]);
      setHarmonyTokensWithBalance([]);
      setHooTokensWithBalance([]);
      setKucoinTokensWithBalance([]);
      setMeterTokensWithBalance([]);
      setAndromedaTokensWithBalance([]);
      setOkcTokensWithBalance([]);
      setOptimismTokensWithBalance([]);
      setPolygonTokensWithBalance([]);
      setThetaTokensWithBalance([]);
      setXdaiTokensWithBalance([]);
    }
  }, [address]);

  useEffect(() => {
    setTokensWithBalance([
      ...avalanceTokensWithBalance,
      ...fantomTokensWithBalance,
      ...bnbTokensWithBalance,
      ...ethereumTokensWithBalance,
      ...iotexTokensWithBalance,
      ...moonriverTokensWithBalance,
      ...fuseTokensWithBalance,
      ...harmonyTokensWithBalance,
      ...hooTokensWithBalance,
      ...kucoinTokensWithBalance,
      ...meterTokensWithBalance,
      ...andromedaTokensWithBalance,
      ...okcTokensWithBalance,
      ...optimismTokensWithBalance,
      ...polygonTokensWithBalance,
      ...thetaTokensWithBalance,
      ...xdaiTokensWithBalance,
    ]);
  }, [
    avalanceTokensWithBalance,
    fantomTokensWithBalance,
    bnbTokensWithBalance,
    ethereumTokensWithBalance,
    iotexTokensWithBalance,
    moonriverTokensWithBalance,
    fuseTokensWithBalance,
    harmonyTokensWithBalance,
    hooTokensWithBalance,
    kucoinTokensWithBalance,
    meterTokensWithBalance,
    andromedaTokensWithBalance,
    okcTokensWithBalance,
    optimismTokensWithBalance,
    polygonTokensWithBalance,
    thetaTokensWithBalance,
    xdaiTokensWithBalance,
  ]);

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
    <>
      <div className={"p-10"}>
        <div className="mx-auto container">
          <div className="flex flex-row">
            <div className="flex flex-col">
              <h1 className={"font-extrabold text-6xl"}>Portfolio</h1>
            </div>
          </div>
          <div
            className={"mt-5 bg-white shadow-2xl p-5 rounded-xl flex flex-col"}
          >
            {address ? (
              <>
                <div className="flex">
                  <span className={"font-extrabold text-xl"}>
                    Balance: $ {totalBalance.toLocaleString()}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 bg-white">
                  {Object.keys(CHAINS)
                    //@ts-ignore
                    .map((chainKey) => CHAINS[chainKey])
                    .map((chain) => (
                      <ChainAggregatedElement
                        chain={chain}
                        balance={getChainBalance(chain)}
                        totalBalance={totalBalance}
                      />
                    ))}
                </div>
                <table className={"w-full bg-white  table"}>
                  <thead>
                    <tr>
                      <th className={"text-left p-3"}>Token</th>
                      <th className={"text-left py-3"}>Balance</th>
                      <th className={"text-left py-3"}>Price</th>
                      <th className={"text-left py-3"}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTokensWithBalancePriceAndTotal.map((token: any) => {
                      return !token.balance ? (
                        <tr
                          key={
                            token.name +
                            ":" +
                            token.chain.provider.network.chainId
                          }
                        ></tr>
                      ) : (
                        <TokenRow
                          key={
                            token.name +
                            ":" +
                            token.chain.provider.network.chainId
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
              </>
            ) : (
              <p>
                Please <strong>connect your Metamask</strong> to TokenGlass to
                view your portfolio.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
