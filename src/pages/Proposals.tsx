import React, { useState } from "react";
import { TokenListingProposalForm } from "../components/proposals/TokenListingProposalForm";
import { ChainListingProposalForm } from "../components/proposals/ChainListingProposalForm";
import { Helmet } from "react-helmet";

const PROPOSAL_TYPES = {
  TOKEN_LISTING: {
    title: "Token Listing",
    value: "token-listing",
  },
  CHAIN_LISTING: {
    title: "Chain Listing",
    value: "chain-listing",
  },
};

const DEMO_PROPOSALS = [
  {
    id: 1,
    title: "Change the blue",
  },
  {
    id: 2,
    title: "Hire a CMO",
  },
];

export default function Proposals(): JSX.Element {
  const [proposalType, setProposalType] = useState(
    PROPOSAL_TYPES.TOKEN_LISTING.value
  );

  const handleProposalChange = (e: any) => {
    setProposalType(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Token Glass - Proposals</title>
      </Helmet>
      <div className="p-10">
        <div className="container mx-auto">
          <h1 className="text-6xl font-extrabold mb-5">Proposals</h1>
          <div className="flex flex-row gap-5">
            <div className="md:w-3/4 flex flex-col">
              <h2 className={"font-extrabold mb-5"}>Current Proposals</h2>
              {DEMO_PROPOSALS.map((proposal: any) => {
                return (
                  <div
                    key={proposal.id}
                    className="p-3 my-5 rounded-xl flex flex-row"
                  >
                    <button className="p-3 bg-white border border-b-4 rounded-xl flex flex-col mr-2">
                      0<i className="fas fa-thumbs-up"></i>
                    </button>
                    <strong>{proposal.title}</strong>
                  </div>
                );
              })}
            </div>
            <div className="md:w-1/4  flex flex-col">
              <h2 className={"font-extrabold"}>Submit</h2>

              <label htmlFor="proposal_type" className={" py-3"}>
                Proposal Type
              </label>
              <select
                name="proposal_type"
                id=""
                className={"p-3 bg-gray-100 rounded-xl"}
                onChange={handleProposalChange}
              >
                {Object.keys(PROPOSAL_TYPES).map((proposalTypeKey: any) => {
                  //@ts-ignore
                  const type = PROPOSAL_TYPES[proposalTypeKey];

                  return (
                    <option key={type.title} value={type.value}>
                      {type.title}
                    </option>
                  );
                })}
              </select>

              {proposalType === PROPOSAL_TYPES.TOKEN_LISTING.value ? (
                <TokenListingProposalForm />
              ) : null}
              {proposalType === PROPOSAL_TYPES.CHAIN_LISTING.value ? (
                <ChainListingProposalForm />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
