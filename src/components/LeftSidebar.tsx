import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

type MenuLink = {
  title: string;
  link: string;
  fa: string;
};
const LINKS: MenuLink[] = [
  {
    title: "Home",
    link: "/",
    fa: "fas fa-home",
  },
  {
    title: "Dashboard",
    link: "/dashboard",
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
  const [toggle, setToggle] = useState(true);
  const currentRoute = useLocation().pathname;
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <aside
      className={`bg-white p-3 flex flex-col shadow-2xl h-screen z-10 sticky top-0`}
      style={{ height: "100%", minHeight: "100vh" }}
    >
      <button className={"btn my-4"} onClick={handleToggle}>
        <i className={"fas fa-bars"}></i>
      </button>

      {LINKS.map((link) => {
        return (
          <Link to={link.link}>
            <button
              className={`flex w-full p-3 hover:text-blue-700 rounded-xl ${
                currentRoute === `${link.link}` ? "bg-gray-100" : ""
              }`}
            >
              <i className={`${link.fa} mt-1`}></i>
              {toggle ? <span className={"ml-2"}> {link.title}</span> : null}
            </button>
          </Link>
        );
      })}
    </aside>
  );
};
