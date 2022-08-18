import React, { useContext, useEffect, useState } from "react";
import { TokenListingProposalForm } from "../components/proposals/TokenListingProposalForm";
import { ChainListingProposalForm } from "../components/proposals/ChainListingProposalForm";
import { Helmet } from "react-helmet";
import { API_URL } from "../consts/config";
import { GenericProposalForm } from "../components/proposals/GenericProposalForm";
import { AddressContext } from "../App";
import moment from "moment";

export default function Proposals(): JSX.Element {
  const address = useContext(AddressContext);
  const [proposalType, setProposalType] = useState("generic-proposal");
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL + "/proposals/all");
      return await response.json();
    };
    fetchData().then((r) => setProposals(r));
  }, []);

  const handleProposalChange = (e: any) => {
    setProposalType(e.target.value);
  };

  // @ts-ignore
  return (
    <>
      <Helmet>
        <title>Token Glass - Proposals</title>
      </Helmet>
      <div className="p-10">
        <div className="container mx-auto">
          <h1 className="text-6xl font-extrabold mb-5">Proposals</h1>

          {address ? (
            <div className="flex flex-row gap-5">
              <div className="md:w-3/4 flex flex-col">
                {proposals
                  .sort(
                    (a: any, b: any) =>
                      //@ts-ignore
                      new Date(b.createdAt) - new Date(a.createdAt)
                  )
                  .map((proposal: any) => {
                    return (
                      <div className="bg-white flex flex-col rounded-xl border border-b-4 mb-5">
                        <div
                          key={proposal.id}
                          className="p-3 rounded-xl flex flex-row"
                        >
                          <div className="flex flex-col w-full">
                            <strong>{proposal.title}</strong>
                            <div className={""}>
                              <p className={"text-gray-700 break-all my-3"}>
                                {proposal.description}
                              </p>
                            </div>
                            <span className={"text-sm border-t"}>
                              By {proposal.user}
                            </span>
                            <span className={"text-sm"}>
                              {moment(proposal.createdAt).fromNow()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="md:w-1/4 flex flex-col">
                <div className="p-3 bg-white flex flex-col rounded-xl border border-b-4">
                  <h2 className={"font-extrabold"}>Submit</h2>
                  <label htmlFor="proposal_type" className={"py-3"}>
                    Proposal Type
                  </label>
                  <select
                    name="proposal_type"
                    id=""
                    className={"p-3 bg-gray-100 rounded-xl"}
                    onChange={handleProposalChange}
                  >
                    <option value="generic-proposal">General Proposal</option>
                  </select>
                  {proposalType === "generic-proposal" ? (
                    <GenericProposalForm />
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div className={"container mx-auto"}>
              "Connect your metamask to TokenGlass to partake in governance."
            </div>
          )}
        </div>
      </div>
    </>
  );
}
