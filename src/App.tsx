import React, { createContext, lazy, Suspense, useState } from "react";
import { Navbar } from "./components/Navbar";
import { LeftSidebar } from "./components/LeftSidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy((): Promise<any> => {
  return import("./pages/Home");
});
const Wallet = lazy((): Promise<any> => {
  return import("./pages/Wallet");
});

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
            <Suspense
              fallback={
                <div className={"w-full h-full"}>
                  <span className={"m-auto"}>Loading...</span>
                </div>
              }
            >
              <Routes>
                <Route path={"/"} element={<Home />} />
                <Route
                  path={"/wallet"}
                  element={<Wallet address={address} />}
                />
              </Routes>
            </Suspense>
          </main>
        </div>
      </AddressContext.Provider>
    </BrowserRouter>
  );
}
