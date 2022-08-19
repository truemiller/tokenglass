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
        <div className="mx-auto container">
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5 mb-5">
            <div className="my-auto  p-3 ">
              <h1 className="text-6xl mb-5 mt-auto font-bold">
                Crypto portfolio tracker
              </h1>
              <p className={"mb-5"}>
                Keep track of your profits, losses, and portfolio valuation with
                our easy-to-use platform.
              </p>
              <Link to={"/portfolio"}>
                <button className="p-3 px-5  bg-blue-700 border border-b-4 text-white hover:bg-blue-900">
                  View portfolio
                </button>
              </Link>
            </div>
            <div className="">
              <img
                src="/screenshots/portfolio.png"
                alt=""
                className={"w-full border border-b-4 rounded-xl"}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 sm:grid-cols-1 ">
            <div className=""></div>
            <div className="">
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-white p-3 border border-b-4 rounded-xl">
                  <i className="fas fa-coins"></i>
                  <h2 className={"font-extrabold"}>{tokenCount} assets </h2>
                </div>
                <div className="bg-white p-3 border border-b-4 rounded-xl">
                  <i className={"fas fa-link"}></i>
                  <h2 className={"font-extrabold"}>{chainCount} chains </h2>
                </div>
                <div className="bg-white p-3 border border-b-4 rounded-xl">
                  <i className={"fas fa-server"}></i>
                  <h2 className={"font-extrabold"}>{rpcCount} RPCs </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
