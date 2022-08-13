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
          <h1 className={"text-6xl font-extrabold mb-5"}>
            Welcome to TokenGlass
          </h1>
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div className="">
              <h2 className="text-5xl mb-5 mt-auto">Track your portfolio</h2>
              <p className={"mb-5"}>
                TokenGlass lets you track all of your assets across multiple
                chains. We don't log your data, the app is fully decentralized.
              </p>
              <Link to={"/dashboard"}>
                <button className="p-3 px-5 rounded-full bg-blue-700 text-white hover:bg-blue-900">
                  Try it out
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
