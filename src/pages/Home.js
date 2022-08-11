import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div className={"p-10"}>
        <div className="mx-auto container">
          <h1 className={"text-6xl font-extrabold"}>Welcome to TokenGlass</h1>
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-1 ">
              <h2 className="text-5xl mb-5 mt-auto">Track your portfolio</h2>
              <p className={"mb-5"}>
                TokenGlass lets you track all of your assets across multiple
                chains. We don't log your data, the app is fully decentralized.
              </p>
              <Link to={"/wallet"}>
                <button className="p-3 bg-blue-900 text-white hover:bg-gray-900">
                  Try it out
                </button>
              </Link>
            </div>
            <div className=" col-span-2">
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
};
