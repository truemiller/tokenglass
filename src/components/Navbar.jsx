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
      <nav className="navbar bg-white border-left border-bottom">
        <div className="container-fluid">
          <a href="#" className="navbar-brand fw-bolder">
            {APP_NAME}
          </a>

          {address ? (
            <DisconnectButton setAddress={setAddress}></DisconnectButton>
          ) : (
            <ConnectButton handleConnect={handleConnect}></ConnectButton>
          )}
        </div>
      </nav>
    </>
  );
}

function ConnectButton({ handleConnect }) {
  return (
    <button className="btn btn-primary rounded" onClick={handleConnect}>
      Connect
    </button>
  );
}

function DisconnectButton({ setAddress }) {
  return (
    <button className={"btn btn-danger rounded"} onClick={() => setAddress("")}>
      Disconnect
    </button>
  );
}
