import { useContext } from "react";
import { TokenRow } from "./components/TokenRow";
import { TokensContext } from "./App";

export default function Wallet({ address, setTokens }) {
  const tokens = useContext(TokensContext);

  return (
    <>
      <div className={"container p-5"}>
        <table className={"w-full rounded-lg bg-white shadow-xl"}>
          <thead className={"text-left "}>
            <tr>
              <th className={"fw-bolder p-3"}>Token</th>
              <th className={"fw-bolder p-3"}>Balance</th>
              <th className={"fw-bolder p-3"}>Price</th>
              <th className={"fw-bolder p-3"}>Total</th>
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
