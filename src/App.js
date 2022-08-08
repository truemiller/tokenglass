import { Navbar } from "./components/Navbar";
import Wallet from "./Wallet";
import { createContext, useEffect, useState } from "react";
import { LeftSidebar } from "./components/LeftSidebar";
import { TOKENS } from "./consts/tokens";
import { getBalance } from "./helper/EthersHelper";
import { ethers } from "ethers";
import { getCoingeckoPrice } from "./helper/CoinGeckoHelper";
//contexts
export const AddressContext = createContext("");
export const TotalBalanceContext = createContext(0);
export const TokensContext = createContext([]);
export default function App() {
  //state
  const [address, setAddress] = useState(window.ethereum.selectedAddress);
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
      let tokensInWallet = TOKENS.map(async (token) => {
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
    console.log(tokensWithBalance, tokensWithBalanceAndPrice);
    tokensToUpdate().then((r) => r);
  }, [tokensWithBalance]);

  // update tokens with totals (setTokensWithBalancePriceAndTotal)
  useEffect(() => {
    setTokensWithBalancePriceAndTotal(
      tokensWithBalanceAndPrice.map((token) => {
        token["total"] = token.price * token.balance;
        return token;
      })
    );
  }, [tokensWithBalanceAndPrice]);

  // update total balance
  useEffect(() => {
    if (tokensWithBalancePriceAndTotal.length > 0) {
      const sum = tokensWithBalancePriceAndTotal
        .map((token) => token.total)
        .reduce((a, b) => a + b);
      setTotalBalance(sum);
    } else {
      setTotalBalance(0);
    }
  }, [tokensWithBalancePriceAndTotal]);

  return (
    <AddressContext.Provider value={address}>
      <TokensContext.Provider value={tokensWithBalancePriceAndTotal}>
        <TotalBalanceContext.Provider value={totalBalance}>
          <div className="d-flex flex-row">
            <LeftSidebar />
            <main className={"w-100 bg-light"}>
              <Navbar setAddress={setAddress}></Navbar>
              <div className="container text-center my-5">
                <h1 className={"fw-bolder"}>
                  $ {totalBalance.toLocaleString()}
                </h1>
              </div>
              <hr />
              <Wallet address={address} setTokens={setTokens} />
            </main>
          </div>
        </TotalBalanceContext.Provider>
      </TokensContext.Provider>
    </AddressContext.Provider>
  );
}
