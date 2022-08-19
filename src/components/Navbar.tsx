import React, { useContext } from "react";
import { AddressContext } from "../App";
//@ts-ignore
import Blockies from "react-blockies";

type NavbarProps = {
  setAddress: Function;
};

export function Navbar({ setAddress }: NavbarProps) {
  const address = useContext(AddressContext);

  const handleConnect = () => {
    window?.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((r: any) => {
        setAddress(r[0]);
      });
  };

  return (
    <>
      <nav
        className="w-full p-3 top-0 sticky bg-white shadow-xl"
        style={{ height: "70px" }}
      >
        <div className="mx-auto">
          <div className="flex justify-between">
            <div className={"flex flex-row"}>
              <i className="fas fa-magnifying-glass mr-3 text-blue-700 my-auto"></i>
              <form>
                <input
                  type="text"
                  className="p-3"
                  placeholder={"Search for a wallet"}
                />
              </form>
            </div>
            <div className={"flex flex-row"}>
              {address ? (
                <>
                  <Blockies
                    seed={address}
                    className={"my-auto mr-5 rounded-full"}
                  />
                  <button
                    className={
                      "btn btn-danger rounded-xl p-2 px-5 bg-red-700 hover:bg-red-900 text-white shadow border"
                    }
                    onClick={() => setAddress(null)}
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-blue-700 p-2 px-5 rounded-xl text-white hover:bg-blue-900 shadow border"
                    onClick={handleConnect}
                  >
                    Connect
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
