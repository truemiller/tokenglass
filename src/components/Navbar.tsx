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
        className="w-full p-3 top-0 sticky bg-white"
        style={{ height: "70px" }}
      >
        <div className="mx-auto">
          <div className="flex justify-between">
            <div>
              <i className="fas fa-magnifying-glass mr-3 text-blue-700"></i>
              <input
                type="text"
                className="p-3"
                placeholder={"Search for a wallet"}
              />
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
                      "btn btn-danger rounded-xl p-2 px-5 bg-red-600 hover:bg-red-900 text-white"
                    }
                    onClick={() => setAddress(null)}
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-blue-700 p-2 px-5 rounded-xl text-white hover:bg-blue-900"
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
