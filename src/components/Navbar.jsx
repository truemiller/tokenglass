import { APP_NAME } from "../consts/config";
import { useContext } from "react";
import { AddressContext } from "../App";

export function Navbar({ setAddress }) {
  const address = useContext(AddressContext);
  console.log(address);
  const handleConnect = (e) => {
    window.ethereum.request({ method: "eth_requestAccounts" }).then((r) => {
      setAddress(window.ethereum.selectedAddress);
    });
  };

  return (
    <>
      <nav className="navbar bg-light shadow border-bottom">
        <div className="container">
          <a href="#" className="navbar-brand">
            {APP_NAME}
          </a>

          {address === "" ? (
            <ConnectButton handleConnect={handleConnect}></ConnectButton>
          ) : (
            <DisconnectButton setAddress={setAddress}></DisconnectButton>
          )}
        </div>
      </nav>
    </>
  );
}

function ConnectButton({ handleConnect }) {
  return (
    <button className="btn btn-success" onClick={handleConnect}>
      Connect
    </button>
  );
}

function DisconnectButton({ setAddress }) {
  return (
    <button className={"btn btn-danger"} onClick={() => setAddress("")}>
      Disconnect
    </button>
  );
}
