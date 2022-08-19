import React, { useCallback, useEffect, useState } from "react";
import { Token, TOKENS } from "../../consts/tokens";
import { Chain, CHAINS } from "../../consts/chains";
import { BigNumber, ethers } from "ethers";
import { getBalance } from "../../helper/EthersHelper";
import { getCoingeckoPrice } from "../../helper/CoinGeckoHelper";
import { TokenRow } from "./TokenRow";

export function Tokens({
  address,
  setTokens,
  tokens,
}: {
  address: string;
  setTokens: any;
  tokens: Token[];
}): JSX.Element {
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

  // update tokens with balance (setTokensWithBalance)
  useEffect(() => {
    setLoadingState("Getting tokens");
    const getTokens = async (chain: Chain) => {
      const batchSize = 200;
      let tokensInWallet;
      let allTokens = TOKENS.filter((token) => token.chain === chain);
      let runs = Math.ceil(allTokens.length / batchSize);
      let allResolved: Token[] = [];
      for (let x = 0; x <= runs; x++) {
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
        let resolved =
          (await Promise.all(tokensInWallet)
            .then((r) => r)
            .catch((e) => e)) ?? [];
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

  // compile seperate token balances into one list as dependencies change
  useEffect(() => {
    setTokensWithBalance([
      ...avalanceTokensWithBalance,
      ...arbitrumTokensWithBalance,
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
    address,
    avalanceTokensWithBalance,
    arbitrumTokensWithBalance,
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
    const sortedTokens = tokensWithBalancePriceAndTotal.sort(
      (a: Token, b: Token) => (b.total ?? 0) - (a.total ?? 0)
    );
    setTokens(sortedTokens);
  }, [address, setTokens, tokensWithBalancePriceAndTotal]);

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
      <table className={"w-full table"}>
        <thead>
          <tr>
            <th className={"text-left"}>Token</th>
            <th className={"text-left"}>Balance</th>
            <th className={"text-left"}>Price</th>
            <th className={"text-left"}>Total</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token: any) => {
            return !token.balance ? (
              <tr
                key={token.name + ":" + token.chain.provider.network.chainId}
              ></tr>
            ) : (
              <TokenRow
                key={token.name + ":" + token.chain.provider.network.chainId}
                tokenData={token}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}
