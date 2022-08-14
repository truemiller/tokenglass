import React from "react";

export function ChainListingProposalForm(): JSX.Element {
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
        Chain Name
      </label>
      <input
        type="text"
        className={"p-3 bg-gray-100 rounded-xl"}
        required={true}
      />
      <label htmlFor="" className={"py-3"}>
        Chain ID
      </label>
      <input
        type="text"
        className={"p-3 bg-gray-100 rounded-xl"}
        required={true}
      />
      <label htmlFor="" className={"py-3"}>
        RPC URL
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
