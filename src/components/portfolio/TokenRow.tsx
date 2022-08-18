import React from "react";
import { Chain } from "../../consts/chains";

type TokenRowProps = {
  tokenData: {
    name: string;
    coingecko: string;
    chain: Chain;
    symbol: string;
    balance: number;
    price: number;
    total: number;
  };
};

export const TokenRow = ({ tokenData }: TokenRowProps) => {
  return (
    <tr key={tokenData.name} className={"w-full hover:bg-gray-100 border"}>
      <td className={"flex p-2"}>
        <img
          src={`/logos/${tokenData.coingecko}.png`}
          alt=""
          className={"rounded-full w-8 h-8 border-2 border-black"}
          loading={"lazy"}
        />
        <img
          className={
            "w-4 h-4 m-0 -ml-2 rounded-full bg-white mr-3 border-2 border-black"
          }
          src={tokenData.chain.logo}
          alt=""
          loading={"lazy"}
        />
        <div className={"flex flex-col ms-2"}>
          <strong>{tokenData.name}</strong>
          {tokenData.symbol.toUpperCase()}
        </div>
      </td>
      <td>{tokenData.balance.toLocaleString()}</td>
      <td>$ {tokenData.price}</td>
      <td>$ {tokenData.total ? tokenData.total.toLocaleString() : ""}</td>
    </tr>
  );
};
