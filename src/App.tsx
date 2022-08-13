import React, { createContext, lazy, Suspense, useState } from "react";
import { Navbar } from "./components/Navbar";
import { LeftSidebar } from "./components/LeftSidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";

const Home = lazy((): Promise<any> => {
  return import("./pages/Home");
});
const Dashboard = lazy((): Promise<any> => {
  return import("./pages/Dashboard");
});
const RPC = lazy((): Promise<any> => {
  return import("./pages/RPC");
});
const Proposals = lazy((): Promise<any> => {
  return import("./pages/Proposals");
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
          <main className={"flex flex-col bg-light w-full"}>
            <Navbar setAddress={setAddress}></Navbar>
            <Suspense fallback={<span className={"m-auto"}>Loading...</span>}>
              <Routes>
                <Route path={"/"} element={<Home />} />
                <Route
                  path={"/dashboard"}
                  element={<Dashboard address={address} />}
                />
                <Route path={"/rpc"} element={<RPC />} />
                <Route path={"/proposals"} element={<Proposals />} />
              </Routes>
            </Suspense>
            <Footer />
          </main>
        </div>
      </AddressContext.Provider>
    </BrowserRouter>
  );
}
