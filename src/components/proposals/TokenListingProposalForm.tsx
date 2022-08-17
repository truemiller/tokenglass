import { CHAINS } from "../../consts/chains";
import React from "react";

export function TokenListingProposalForm(): JSX.Element {
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <form action={"#"} onSubmit={handleSubmit} className={"flex flex-col"}>
      <label htmlFor="" className={"py-3"}>
        Proposal Title
      </label>
      <input
        type="text"
        className={"p-3 bg-gray-100 rounded-xl"}
        required={true}
      />
      <label htmlFor="" className={"py-3"}>
        Chain
      </label>
      <select className={"p-3 bg-gray-100 rounded-xl"} required={true}>
        {Object.keys(CHAINS).map((chain: string) => {
          return (
            <option key={chain} value={1}>
              {
                // @ts-ignore
                CHAINS[chain].provider.network.name
              }
            </option>
          );
        })}
      </select>
      <label htmlFor="" className={"py-3"}>
        Token Name
      </label>
      <input
        type="text"
        className={"p-3 bg-gray-100 rounded-xl"}
        required={true}
      />
      <label htmlFor="" className={"py-3"}>
        Token Symbol
      </label>
      <input
        type="text"
        className={"p-3 bg-gray-100 rounded-xl"}
        required={true}
      />
      <label htmlFor="" className={"py-3"}>
        Coingecko Link
      </label>
      <input
        type="text"
        className={"p-3 bg-gray-100 rounded-xl"}
        required={true}
      />
      <label htmlFor="" className={"py-3"}>
        Contract Address
      </label>
      <input
        type="text"
        className={"p-3 bg-gray-100 rounded-xl"}
        required={true}
      />
      <label htmlFor="" className={"py-3"}>
        Logo URL
      </label>
      <input
        type="text"
        className={"p-3 bg-gray-100 rounded-xl"}
        required={true}
      />
      <input
        type="submit"
        className={"mt-5 p-3 bg-gray-100 text-gray-400 rounded-full"}
        value={"Submit Proposal"}
        disabled={true}
      />
    </form>
  );
}
