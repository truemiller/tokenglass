import { useContext, useEffect, useState } from "react";
import { TokenRow } from "../components/TokenRow";
import { TokensContext } from "../App";
import { NATIVE_TOKENS, TOKENS } from "../consts/tokens";
import { BigNumber, ethers } from "ethers";
import { getBalance } from "../helper/EthersHelper";
import { CHAINS } from "../consts/chains";
import { getCoingeckoPrice } from "../helper/CoinGeckoHelper";

export default function Wallet({ address }) {
  const [tokensWithBalance, setTokensWithBalance] = useState([]);
  const [tokensWithBalanceAndPrice, setTokensWithBalanceAndPrice] = useState(
    []
  );
  const [tokensWithBalancePriceAndTotal, setTokensWithBalancePriceAndTotal] =
    useState([]);
  const [
    sortedTokensWithBalancePriceAndTotal,
    setSortedTokensWithBalancePriceAndTotal,
  ] = useState([]);

  const [totalBalance, setTotalBalance] = useState(0);

  const [avaxTotalBalance, setAvaxTotalBalance] = useState(0);
  const [bnbTotalBalance, setBnbTotalBalance] = useState(0);
  const [ethTotalBalance, setEthTotalBalance] = useState(0);

  // update tokens with balance (setTokensWithBalance)
  useEffect(() => {
    const getTokens = async (chain) => {
      let tokensInWallet;
      tokensInWallet = [...NATIVE_TOKENS, ...TOKENS]
        .filter((token) => token.chain === chain)
        .map(async (token, index) => {
          if (index <= 500) {
            if (ethers.utils.isAddress(token.address)) {
              token["balance"] = await getBalance(token, address).then(
                (r) => r
              );
            } else {
              token["balance"] = await token.chain.provider.getBalance(address);
              console.log(token.chain.provider.network.chainId);
            }
            const resolvedToken = await token;
            const balanceAsBN = BigNumber.from(token["balance"]);
            const balanceAsString = ethers.utils
              .formatEther(balanceAsBN)
              .toString();
            resolvedToken["balance"] = parseFloat(balanceAsString);
            return token;
          }
        });
      console.log(tokensInWallet);
      // resolve all the promises
      let resolved = await Promise.all(tokensInWallet);
      let filtered = resolved
        .filter((token) => token)
        .filter((token) => token["balance"] > 0);
      return [...filtered];
    };

    const batch = async () => {
      const avalanche = (await getTokens(CHAINS.AVALANCHE)) ?? [];
      setTokensWithBalance([...avalanche]);
      const fantom = (await getTokens(CHAINS.FANTOM)) ?? [];
      setTokensWithBalance([...avalanche, ...fantom]);
      const polygon = (await getTokens(CHAINS.POLYGON)) ?? [];
      setTokensWithBalance([...avalanche, ...fantom, ...polygon]);
      const iotex = (await getTokens(CHAINS.IOTEX)) ?? [];
      setTokensWithBalance([...avalanche, ...fantom, ...polygon, ...iotex]);
      const xdai = (await getTokens(CHAINS.XDAI)) ?? [];
      setTokensWithBalance([
        ...avalanche,
        ...fantom,
        ...polygon,
        ...iotex,
        ...xdai,
      ]);
      const moonriver = (await getTokens(CHAINS.MOONRIVER)) ?? [];
      setTokensWithBalance([
        ...avalanche,
        ...fantom,
        ...polygon,
        ...iotex,
        ...xdai,
        ...moonriver,
      ]);
      const fuse = (await getTokens(CHAINS.FUSE)) ?? [];
      setTokensWithBalance([
        ...avalanche,
        ...fantom,
        ...polygon,
        ...iotex,
        ...xdai,
        ...moonriver,
        ...fuse,
      ]);
      const bnb = (await getTokens(CHAINS.BNB)) ?? [];
      setTokensWithBalance([
        ...avalanche,
        ...fantom,
        ...polygon,
        ...iotex,
        ...xdai,
        ...moonriver,
        ...fuse,
        ...bnb,
      ]);
      const eth = (await getTokens(CHAINS.ETHEREUM)) ?? [];
      setTokensWithBalance([
        ...avalanche,
        ...fantom,
        ...polygon,
        ...iotex,
        ...xdai,
        ...moonriver,
        ...fuse,
        ...bnb,
        ...eth,
      ]);
    };

    if (address) {
      batch().then((r) => r);
    } else setTokensWithBalance([]);
  }, [address]);

  // update tokens with price (setTokensWithBalanceAndPrice)
  useEffect(() => {
    const tokensToUpdate = async () => {
      const ids = tokensWithBalance.map((token) => token.coingecko);
      const idsString = ids.join(",");
      if (idsString.length > 0 && address && tokensWithBalance.length > 0) {
        const coinGeckoPrices = await getCoingeckoPrice(idsString);
        setTokensWithBalanceAndPrice(
          Object.keys(coinGeckoPrices).map((key) => {
            const token = tokensWithBalance.find(
              (token) => token["coingecko"] === key
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
          token["total"] = token.price * token.balance;
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
      tokensWithBalancePriceAndTotal.sort((a, b) => a.total < b.total)
    );
  }, [address, tokensWithBalancePriceAndTotal]);

  // update total balance
  useEffect(() => {
    if (address && tokensWithBalancePriceAndTotal.length > 0) {
      const sum = tokensWithBalancePriceAndTotal
        .map((token) => token.total)
        .reduce((a, b) => a + b);
      setTotalBalance(sum);
    } else {
      setTotalBalance(0);
    }
  }, [address, tokensWithBalancePriceAndTotal]);

  return (
    <>
      <div className="hero my-5 p-5">
        <h1 className={"font-extrabold text-6xl"}>Portfolio</h1>
      </div>
      <div className={"m-3 p-3 bg-white "}>
        <div className="flex">
          <span className={"font-extrabold text-xl"}>
            Balance: $ {totalBalance.toLocaleString()}
          </span>
        </div>
        <table className={"w-full  bg-white shadow-xl table"}>
          <thead className={"text-left w-full "}>
            <tr className={""}>
              <th className={"fw-bolder p-3"}>Token</th>
              <th className={"fw-bolder p-3"}>Balance</th>
              <th className={"fw-bolder p-3"}>Price</th>
              <th className={"fw-bolder p-3"}>Total</th>
            </tr>
          </thead>
          <tbody>
            {sortedTokensWithBalancePriceAndTotal.map((token) => {
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
      </div>
    </>
  );
}
