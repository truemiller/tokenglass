import { APP_NAME } from "../consts/config";
import React, { useContext } from "react";
import { AddressContext } from "../App";

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
      <nav className="w-full border-b-4 p-3 top-0 sticky bg-white">
        <div className="container mx-auto">
          <div className="flex justify-between">
            <a href="/" className="font-bold p-2">
              {APP_NAME}
            </a>
            {address ? (
              <button
                className={
                  "btn btn-danger rounded-xl p-2 px-5 bg-red-600 hover:bg-red-900 text-white"
                }
                onClick={() => setAddress(null)}
              >
                Disconnect
              </button>
            ) : (
              <button
                className="bg-blue-700 p-2 px-5 rounded-xl text-white hover:bg-blue-900"
                onClick={handleConnect}
              >
                Connect
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
