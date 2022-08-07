import { useEffect, useState } from "react";
import { TOKENS } from "./consts/tokens";
import { getBalance } from "./helper/EthersHelper";
import { ethers } from "ethers";
import { APP_NAME } from "./consts/config";
import { TokenRow } from "./components/TokenRow";
import { Navbar } from "./components/Navbar";

export default function Wallet({address}) {

  const [tokens, setTokens] = useState([]);

  // set tokens
  useEffect(() => {
    const getTokens = async () => {
      // get tokens with balance
      let tokensWithBalance = TOKENS.map(async (token) => {
        token["balance"] = await getBalance(token, address);
        const resolvedToken = await token;
        if (token["balance"]) {
          token["balance"] = parseFloat(
            ethers.utils.formatEther(token["balance"])
          );
        }
        return token;
      });
      // resolve all the promises
      let resolved = await Promise.all(tokensWithBalance);
      // sort by balance
      resolved = resolved.sort((a, b) => a.balance < b.balance);
      setTokens(resolved);
    };
    getTokens().then((r) => r);
  }, [address]);

  return (
    <>
      <div className={"container"}>
        Connected: <pre>{address}</pre>
        <table className={"table"}>
          <thead className={"bg-light"}>
            <tr>
              <th className={"fw-bolder"}>Token</th>
              <th className={"fw-bolder"}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token) => {
              return !token.balance ? (
                <tr key={token.name}></tr>
              ) : (
                <TokenRow key={token.name} tokenData={token} />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
