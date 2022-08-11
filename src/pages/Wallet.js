import { useEffect, useState } from "react";
import { TokenRow } from "../components/TokenRow";
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
      const batchSize = 200;
      let tokensInWallet;
      let allTokens = [...NATIVE_TOKENS, ...TOKENS].filter(
        (token) => token.chain === chain
      );
      let runs = Math.ceil(allTokens.length / batchSize);
      let allResolved = [];
      for (let x = 0; x < runs; x++) {
        tokensInWallet = allTokens.map(async (token, index) => {
          let tokenPromises = [];
          if (index + batchSize * x <= batchSize + batchSize * x) {
            if (ethers.utils.isAddress(token.address)) {
              token["balance"] = await getBalance(token, address)
                .then((r) => r)
                .catch((e) => e);
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
          .filter((token) => token)
          .filter((token) => token["balance"] > 0);
        allResolved = [...allResolved, ...filtered];
      }
      console.log(allResolved);
      return allResolved;
    };

    const batch = async () => {
      let _tokensWithBalance = [];
      for (let chainKey in CHAINS) {
        const chain = CHAINS[chainKey];
        const tokens = (await getTokens(chain)) ?? [];
        _tokensWithBalance = [..._tokensWithBalance, ...tokens];
        setTokensWithBalance(_tokensWithBalance);
      }
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
    <div className={"p-10"}>
      <div className="mx-auto container">
        <div className="hero">
          <h1 className={"font-extrabold text-6xl"}>Portfolio</h1>
        </div>
        <div className={"mt-5 bg-white "}>
          <div className="flex">
            <span className={"font-extrabold text-xl"}>
              Balance: $ {totalBalance.toLocaleString()}
            </span>
          </div>
          <table className={"w-full  bg-white shadow-2xl table"}>
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
        </div>
      </div>
    </div>
  );
}
