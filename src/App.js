import { Navbar } from "./components/Navbar";
import {BrowserRouter} from "react-router-dom"
import Wallet from "./Wallet";
import {createContext, useContext, useEffect, useState} from "react";

const AddressContext = createContext("")

export default function App() {

  const [address, setAddress] = useState("")

  return (
    <AddressContext.Provider value={address}>
      <Navbar setAddress={setAddress}></Navbar>
      <div className="container text-center my-5">
        <h1>Wow amazing</h1>
      </div>
      <hr/>
      <Wallet address={address}/>
    </AddressContext.Provider>
  );
}
