import { Link } from "react-router-dom";
import React, { useMemo } from "react";
import { TOKENS } from "../consts/tokens";
import { RPCS } from "../consts/rpcs";
import { CHAINS } from "../consts/chains";
import { Helmet } from "react-helmet";

export default function Home() {
  const tokenCount = useMemo(() => {
    return TOKENS.length;
  }, []);
  const rpcCount = useMemo(() => {
    return RPCS.length;
  }, []);
  const chainCount = useMemo(() => {
    return Object.keys(CHAINS).length;
  }, []);

  return (
    <>
      <Helmet>
        <title>Token Glass</title>
      </Helmet>
      <div className={"p-10"}>
        <div className="mx-auto container text-center">
          <div className="my-auto p-3">
            <h1 className="text-6xl mb-5 mt-auto font-bold">Token Glass</h1>
            <p className={"mb-5"}>
              Keep track of your profits, losses, and portfolio valuation with
              our easy-to-use platform.
            </p>
            <Link to={"/portfolio"}>
              <button className="p-3 px-5 mb-3 bg-blue-700 shadow-xl rounded-xl text-white hover:bg-blue-900">
                View portfolio
              </button>
            </Link>
          </div>
          <div className="flex flex-row flex-wrap mb-10">
            <div className="w-1/3 px-3">
              <div className="bg-white p-3 shadow-xl rounded-xl">
                <i className="fas fa-coins"></i>
                <h2 className={"font-extrabold"}>{tokenCount} assets </h2>
              </div>
            </div>
            <div className="w-1/3 px-3">
              <div className="bg-white p-3 shadow-xl rounded-xl">
                <i className={"fas fa-link"}></i>
                <h2 className={"font-extrabold"}>{chainCount} chains </h2>
              </div>
            </div>
            <div className="w-1/3 px-3">
              <div className="bg-white p-3 shadow-xl rounded-xl">
                <i className={"fas fa-server"}></i>
                <h2 className={"font-extrabold"}>{rpcCount} RPCs </h2>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <img
              src="/screenshots/portfolio.png"
              alt=""
              className={"shadow-xl rounded-xl"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
