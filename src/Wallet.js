import { useContext } from "react";
import { TokenRow } from "./components/TokenRow";
import { TokensContext } from "./App";

export default function Wallet({ address, setTokens }) {
  const tokens = useContext(TokensContext);

  return (
    <>
      <div className={"container"}>
        Connected to: <pre>{address}</pre>
        <table className={"table table-white border shadow"}>
          <thead className={"bg-light"}>
            <tr>
              <th className={"fw-bolder"}>Token</th>
              <th className={"fw-bolder"}>Balance</th>
              <th className={"fw-bolder"}>Price</th>
              <th className={"fw-bolder"}>Total</th>
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
