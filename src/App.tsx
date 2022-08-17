import React, {
  createContext,
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";
import { Navbar } from "./components/Navbar";
import { LeftSidebar } from "./components/LeftSidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";

const Home = lazy((): Promise<any> => {
  return import("./pages/Home");
});
const Portfolio = lazy((): Promise<any> => {
  return import("./pages/Portfolio");
});
const RPC = lazy((): Promise<any> => {
  return import("./pages/RPC");
});
const Proposals = lazy((): Promise<any> => {
  return import("./pages/Proposals");
});
const About = lazy((): Promise<any> => {
  return import("./pages/About");
});
const Team = lazy((): Promise<any> => {
  return import("./pages/Team");
});

//contexts
export const AddressContext = createContext("");
export const TotalBalanceContext = createContext(0);
export const TokensContext = createContext([]);

export default function App(): JSX.Element {
  //state
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    window?.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((r: any) => {
        setAddress(r[0]);
      });
  }, []);

  return (
    <BrowserRouter>
      <AddressContext.Provider value={address}>
        <div className="flex flex-row bg-gray-100">
          <LeftSidebar />
          <main className={"flex flex-col bg-light w-full"}>
            <Navbar setAddress={setAddress}></Navbar>
            <Suspense fallback={<span className={"m-auto"}>Loading...</span>}>
              <Routes>
                <Route path={"/"} element={<Home />} />
                <Route
                  path={"/portfolio"}
                  element={<Portfolio address={address} />}
                />
                <Route path={"/rpc"} element={<RPC />} />
                <Route path={"/proposals"} element={<Proposals />} />
                <Route path={"/about"} element={<About />} />
                <Route path={"/team"} element={<Team />} />
              </Routes>
            </Suspense>
            <Footer />
          </main>
        </div>
      </AddressContext.Provider>
    </BrowserRouter>
  );
}
