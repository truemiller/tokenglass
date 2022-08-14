import { Link } from "react-router-dom";
import React, { useMemo } from "react";
import { TOKENS } from "../consts/tokens";
import { RPCS } from "../consts/rpcs";

export default function Home() {
  const tokenCount = useMemo(() => {
    return TOKENS.length;
  }, []);
  const rpcCount = useMemo(() => {
    return RPCS.length;
  }, []);

  return (
    <>
      <div className={"p-10"}>
        <div className="mx-auto container">
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div className="my-auto  p-3 ">
              <h1 className="text-6xl mb-5 mt-auto font-extrabold">
                Crypto portfolio tracker
              </h1>
              <p className={"mb-5"}>
                Keep track of your profits, losses, and portfolio valuation with
                our easy-to-use platform.
              </p>
              <Link to={"/dashboard"}>
                <button className="p-3 px-5 rounded-full bg-blue-700 text-white hover:bg-blue-900">
                  View portfolio
                </button>
                <button className="ml-5 p-3 px-5 rounded-full bg-blue-700 text-white hover:bg-blue-900">
                  Fuck a goat
                </button>
              </Link>
            </div>
            <div className="">
              <img
                src="/screenshots/portfolio.png"
                alt=""
                className={"shadow w-full rounded-xl"}
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className=""></div>
            <div className="">
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-white p-3 shadow rounded-xl">
                  <h2 className={"text-5xl"}>{tokenCount} assets </h2>
                </div>
                <div className="bg-white p-3 shadow rounded-xl">
                  <h2 className={"text-5xl"}>{rpcCount} RPCs </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
