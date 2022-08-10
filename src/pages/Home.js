import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div className={"w-full ml-5 p-5"}>
        <div className=" w-full">
          <h1 className={"my-5 text-6xl font-extrabold ms-5"}>
            Welcome to TokenGlass
          </h1>
          <div className="columns-2">
            <div className="left col-span-1">
              <h2 className="text-5xl mb-5 ">Track your portfolio</h2>
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
            <div className="right col-span-1">
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
