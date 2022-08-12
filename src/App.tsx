import React from "react";
import { Navbar } from "./components/Navbar";
import Wallet from "./pages/Wallet";
import { Home } from "./pages/Home";
import { createContext, useState } from "react";
import { LeftSidebar } from "./components/LeftSidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//contexts
export const AddressContext = createContext(null);
export const TotalBalanceContext = createContext(0);
export const TokensContext = createContext([]);

export default function App(): JSX.Element {
  //state
  const [address, setAddress] = useState(
    window.ethereum.selectedAddress ?? null
  );

  return (
    <BrowserRouter>
      <AddressContext.Provider value={address}>
        <div className="flex flex-row">
          <LeftSidebar />
          <main className={"w-full bg-light"}>
            <Navbar setAddress={setAddress}></Navbar>
            <Routes>
              <Route path={"/"} element={Home()} />
              <Route path={"/wallet"} element={Wallet({ address })} />
            </Routes>
          </main>
        </div>
      </AddressContext.Provider>
    </BrowserRouter>
  );
}
