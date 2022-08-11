import { APP_NAME } from "../consts/config";
import { useContext } from "react";
import { AddressContext } from "../App";

export function Navbar({ setAddress }) {
  const address = useContext(AddressContext);
  const handleConnect = (e) => {
    window.ethereum.request({ method: "eth_requestAccounts" }).then((r) => {
      setAddress(window.ethereum.selectedAddress);
    });
  };

  return (
    <>
      <nav className="shadow-xl w-full p-3 top-0 sticky bg-white">
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
