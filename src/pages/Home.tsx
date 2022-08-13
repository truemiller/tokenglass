import { Link } from "react-router-dom";
import React from "react";

export default function Home() {
  return (
    <>
      <div className={"p-10"}>
        <div className="mx-auto container">
          <h1 className={"text-6xl font-extrabold"}>Welcome to TokenGlass</h1>
          <div className="flex flex-row">
            <div className="w-1/2 p-5">
              <h2 className="text-5xl mb-5 mt-auto">Track your portfolio</h2>
              <p className={"mb-5"}>
                TokenGlass lets you track all of your assets across multiple
                chains. We don't log your data, the app is fully decentralized.
              </p>
              <Link to={"/dashboard"}>
                <button className="p-3 bg-blue-900 text-white hover:bg-gray-900">
                  Try it out
                </button>
              </Link>
            </div>
            <div className="w-1/2 p-5">
              <img
                src="/screenshots/portfolio.png"
                alt=""
                className={"shadow-2xl w-full"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
