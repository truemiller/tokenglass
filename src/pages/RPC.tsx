import React, { ReactNode, useState } from "react";
import { RPC_NETWORKS, RPCS } from "../consts/rpcs";

export default function RPC(): ReactNode {
  const [filter, setFilter] = useState<string>("");
  const handleFilterClick = (networkSlug: string) => {
    if (filter === networkSlug) {
      setFilter("");
    } else {
      setFilter(networkSlug);
    }
  };

  const handleAddToMetamask = (network: any) => {
    console.debug(`Adding chainId "${network.chainId}" to Metamask`);
    let rpc = RPCS.find((rpc) => rpc.chainId === network.chainId);
    if (!rpc) return;

    let params = {
      chainId: "0x" + network.chainId.toString(16),
      blockExplorerUrls: [`${rpc.block_explorer}`],
      chainName: rpc.name,
      nativeCurrency: {
        name: rpc.symbol,
        symbol: rpc.symbol,
        decimals: 18,
      },
      rpcUrls: [`${rpc.url}`],
    };

    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((p: any) => {
        window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [params, p],
        });
      });
  };

  return (
    <div className={"p-10 "}>
      <div className="container mx-auto">
        <header>
          <h1 className={"text-6xl font-extrabold mb-3"}>RPCs</h1>
          <div className="flex flex-row flex-wrap">
            {RPC_NETWORKS.sort((a, b) =>
              a.network.localeCompare(b.network)
            ).map((rpc_network: any) => {
              return (
                <button
                  key={rpc_network.slug}
                  className={`p-3 border mb-2 mr-2 shadow rounded-xl ${
                    filter === rpc_network.slug
                      ? "bg-blue-700 text-white"
                      : "hover:bg-gray-100 text-blue-500 bg-white"
                  }`}
                  onClick={() => handleFilterClick(rpc_network.slug)}
                >
                  {rpc_network.network}
                </button>
              );
            })}
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
              {RPCS.filter(
                (rpc) => rpc.network === filter || filter === ""
              ).map((rpc) => {
                return (
                  <div
                    key={rpc.url}
                    className={"border p-3 rounded-xl shadow bg-white"}
                  >
                    <dl>
                      <dt className={"font-extrabold"}>Network</dt>
                      <dd>{rpc.name}</dd>
                      <dt className={"font-extrabold"}>URL</dt>
                      <dd>
                        <a href={rpc.url} className={"text-blue-500"}>
                          {rpc.url}
                        </a>
                      </dd>
                      <dt className={"font-extrabold"}>Chain ID</dt>
                      <dd>{rpc.chainId}</dd>
                      <dt className={"font-extrabold"}>Symbol</dt>
                      <dd>{rpc.symbol}</dd>
                      <dt className={"font-extrabold"}>Block Explorer</dt>
                      <dd>{rpc.block_explorer}</dd>
                      <dt className={"font-extrabold"}>Type</dt>
                      <dd>{rpc.type}</dd>
                    </dl>
                    <button
                      className={
                        "mt-3 p-2 bg-blue-700 hover:bg-blue-900 text-white rounded-lg"
                      }
                      onClick={() => handleAddToMetamask(rpc)}
                    >
                      <span className={"flex flex-row"}>
                        Add to Metamask
                        <img
                          src="https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
                          alt=""
                          className={"w-6 ml-2"}
                        />
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
