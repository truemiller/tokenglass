import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

type MenuLink = {
  title: string;
  link: string;
  fa: string;
};
const LINKS: MenuLink[] = [
  {
    title: "Portfolio",
    link: "/portfolio",
    fa: "fas fa-pie-chart",
  },
  {
    title: "RPCs",
    link: "/rpc",
    fa: "fas fa-server",
  },
  {
    title: "Proposals",
    link: "/proposals",
    fa: "fas fa-check-to-slot",
  },
];

export const LeftSidebar = () => {
  const [toggle, setToggle] = useState(false);
  const currentRoute = useLocation().pathname;
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <aside
      className={`bg-gray-900 flex flex-col  h-screen z-10 sticky top-0`}
      style={{
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <div
        className="text-center flex flex-col"
        style={{
          height: "70px",
          background:
            "url('https://img2.goodfon.com/wallpaper/nbig/b/bb/blue-glass-abstract.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <button
          className={"btn my-auto text-white hover:text-blue-400"}
          onClick={handleToggle}
        >
          <i className={`fas fa-bars ${toggle ? "rotate-90" : ""}`}></i>
        </button>
      </div>

      {LINKS.map((link) => {
        return (
          <Link key={link.title} to={link.link}>
            <button
              className={`flex w-full p-3 hover:text-blue-400 ${
                currentRoute === `${link.link}`
                  ? "bg-gray-100 text-black"
                  : "text-white"
              }`}
            >
              <i className={`${link.fa} my-auto`}></i>
              {toggle ? <span className={"ml-2"}> {link.title}</span> : null}
            </button>
          </Link>
        );
      })}
    </aside>
  );
};
