import { Navbar } from "./components/Navbar";
import Wallet from "./Wallet";
import { createContext, useState } from "react";

export const AddressContext = createContext("");

export default function App() {
  const [address, setAddress] = useState();

  return (
    <AddressContext.Provider value={address}>
      <Navbar setAddress={setAddress}></Navbar>
      <div className="container text-center my-5">
        <h1 className={"fw-bolder"}>Wow amazing</h1>
      </div>
      <hr />
      <Wallet address={address} />
    </AddressContext.Provider>
  );
}
