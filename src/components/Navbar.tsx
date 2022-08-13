import { APP_NAME } from "../consts/config";
import { useContext } from "react";
import { AddressContext } from "../App";
import React from "react";

type NavbarProps = {
  setAddress: Function;
};
export function Navbar({ setAddress }: NavbarProps) {
  const address = useContext(AddressContext);
  const handleConnect = () => {
    window.ethereum.request({ method: "eth_requestAccounts" }).then(() => {
      setAddress(window.ethereum.selectedAddress);
    });
  };

  return (
    <>
      <nav className="w-full shadow-2xl p-3 top-0 sticky bg-white">
        <div className="flex justify-between">
          <a href="/" className="font-bold p-2">
            {APP_NAME}
          </a>
          {address ? (
            <button
              className={
                "btn btn-danger rounded p-2 bg-red-600 hover:bg-red-900 text-white"
              }
              onClick={() => setAddress(null)}
            >
              Disconnect
            </button>
          ) : (
            <button
              className="bg-blue-600 p-2 rounded text-white hover:bg-blue-900"
              onClick={handleConnect}
            >
              Connect
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
