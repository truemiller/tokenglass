import { ChainAggregatedElements } from "./ChainAggregatedElements";
import React from "react";

export default function Balance(props: any): JSX.Element {
  const totalBalance = props.totalBalance;

  return (
    <>
      <div className="flex">
        <span className={"font-extrabold text-xl"}>
          Balance: $ {totalBalance.toLocaleString()}
        </span>
      </div>
    </>
  );
}
