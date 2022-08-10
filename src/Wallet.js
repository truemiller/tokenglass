import { useContext } from "react";
import { TokenRow } from "./components/TokenRow";
import { TokensContext } from "./App";

export default function Wallet({ address, setTokens }) {
  const tokens = useContext(TokensContext);

  return (
    <>
      <div className={"m-3 p-3 bg-white "}>
        <div className="flex">
          <span className={"font-extrabold text-xl"}>Tokens</span>
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
            {tokens.map((token) => {
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
