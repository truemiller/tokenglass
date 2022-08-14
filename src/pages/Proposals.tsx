import React from "react";
import { CHAINS } from "../consts/chains";

export default function Proposals(): JSX.Element {
  return (
    <>
      <div className="p-10">
        <div className="container mx-auto">
          <h1 className="text-6xl font-extrabold mb-5">Proposals</h1>
          <div className="grid grid-cols-4 gap-5">
            <div className="md:col-span-3 sm:col-span-2 p-3 bg-white rounded-xl border shadow-2xl">
              <h2 className={"font-extrabold mb-5"}>Current Proposals</h2>
              <p>Coming soon ..</p>
            </div>
            <div className="md:col-span-1 sm:col-span-2 p-3 bg-white rounded-xl border shadow-2xl">
              <h2 className={"font-extrabold"}>Submit</h2>
              <form
                action="#"
                onSubmit={(e) => alert(e)}
                className={"flex flex-col"}
              >
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
                <select
                  className={"p-3 bg-gray-100 rounded-xl"}
                  required={true}
                >
                  {Object.keys(CHAINS).map((chain: string) => {
                    return (
                      <option value={1}>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
