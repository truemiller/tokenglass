import { CHAINS } from "../../consts/chains";
import React, { useState } from "react";
import { API_URL } from "../../consts/config";

export function TokenListingProposalForm(): JSX.Element {
  const [inputs, setInputs] = useState({
    proposalTitle: undefined,
  });

  console.log(inputs);

  const handleChange = (e: any) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(`${API_URL}/proposals/create`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({
        title: `${inputs.proposalTitle}`,
        description: "",
      }),
    }).then((r) => window.location.reload());
  };
  return (
    <form action={"#"} onSubmit={handleSubmit} className={"flex flex-col"}>
      <label htmlFor="proposalTitle" className={"py-3"}>
        Proposal Title
      </label>
      <input
        type="text"
        name={"proposalTitle"}
        className={"p-3 bg-gray-100 rounded-xl"}
        required={true}
        onChange={handleChange}
      />
      <label htmlFor="chains" className={"py-3"}>
        Chain
      </label>
      <select
        className={"p-3 bg-gray-100 rounded-xl"}
        required={true}
        name={"chains"}
        onChange={handleChange}
      >
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
        onChange={handleChange}
      />
      <label htmlFor="" className={"py-3"}>
        Token Symbol
      </label>
      <input
        type="text"
        className={"p-3 bg-gray-100 rounded-xl"}
        required={true}
        onChange={handleChange}
      />
      <label htmlFor="" className={"py-3"}>
        Coingecko Link
      </label>
      <input
        type="text"
        className={"p-3 bg-gray-100 rounded-xl"}
        required={true}
        onChange={handleChange}
      />
      <label htmlFor="" className={"py-3"}>
        Contract Address
      </label>
      <input
        type="text"
        className={"p-3 bg-gray-100 rounded-xl"}
        required={true}
        onChange={handleChange}
      />
      <label htmlFor="" className={"py-3"}>
        Logo URL
      </label>
      <input
        type="text"
        className={"p-3 bg-gray-100 rounded-xl"}
        required={true}
        onChange={handleChange}
      />
      <button
        type="submit"
        className={"mt-5 p-3 text-white bg-blue-700 rounded-xl"}
      >
        Submit
      </button>
    </form>
  );
}
