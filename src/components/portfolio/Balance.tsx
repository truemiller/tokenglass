import React from "react";

export default function Balance(props: any): JSX.Element {
  const totalBalance = props.totalBalance;

  return (
    <>
      <div className={"my-5 shadow-xl bg-white p-5 rounded-xl flex flex-col"}>
        <div className="flex">
          <span className={"font-bold text-xl "}>
            Balance: $ {totalBalance.toLocaleString()}
          </span>
        </div>
      </div>
    </>
  );
}
