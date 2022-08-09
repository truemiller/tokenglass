import { Navbar } from "./components/Navbar";
import Wallet from "./Wallet";
import { createContext, useEffect, useState } from "react";
import { LeftSidebar } from "./components/LeftSidebar";
import { TOKENS } from "./consts/tokens";
import { getBalance } from "./helper/EthersHelper";
import { ethers } from "ethers";
import { getCoingeckoPrice } from "./helper/CoinGeckoHelper";
import { RightSidebar } from "./components/RightSidebar";
import { CHAINS } from "./consts/chains";
//contexts
export const AddressContext = createContext(null);
export const TotalBalanceContext = createContext(0);
export const TokensContext = createContext([]);
export default function App() {
  //state
  const [address, setAddress] = useState(
    window.ethereum.selectedAddress ?? null
  );
  const [tokens, setTokens] = useState([]);
  const [tokensWithBalance, setTokensWithBalance] = useState([]);
  const [tokensWithBalanceAndPrice, setTokensWithBalanceAndPrice] = useState(
    []
  );
  const [tokensWithBalancePriceAndTotal, setTokensWithBalancePriceAndTotal] =
    useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  // update tokens with balance (setTokensWithBalance)
  useEffect(() => {
    const getTokens = async () => {
      let tokensInWallet = TOKENS.filter(
        (token) => token.chain === CHAINS.AVALANCHE
      ).map(async (token) => {
        if (token.address) {
          token["balance"] = await getBalance(token, address);
        } else {
          token["balance"] = await token.chain.provider.getBalance(address);
        }
        const resolvedToken = await token;
        resolvedToken["balance"] = parseFloat(
          ethers.utils.formatEther(resolvedToken["balance"])
        );
        return token;
      });
      // resolve all the promises
      let resolved = await Promise.all(tokensInWallet);
      setTokensWithBalance(resolved);
    };
    if (address) getTokens().then((r) => r);
    else setTokensWithBalance([]);
  }, [address, tokens]);

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
    <AddressContext.Provider value={address}>
      <TokensContext.Provider value={tokensWithBalance}>
        <TotalBalanceContext.Provider value={totalBalance}>
          <div className="flex flex-row">
            <LeftSidebar />
            <main className={"w-full bg-light"}>
              <Navbar setAddress={setAddress}></Navbar>
              <div className="text-center my-5">
                <h1 className={"font-extrabold text-4xl"}>
                  $ {totalBalance.toLocaleString()}
                </h1>
              </div>
              <div className="grid grid-cols-5">
                <div className="md:col-span-4 col-span-5">
                  <Wallet address={address} setTokens={setTokens} />
                </div>
                <div className="md:col-span-1 hidden md:block">
                  <RightSidebar />
                </div>
              </div>
            </main>
          </div>
        </TotalBalanceContext.Provider>
      </TokensContext.Provider>
    </AddressContext.Provider>
  );
}
