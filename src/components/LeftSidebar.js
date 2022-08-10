import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const LeftSidebar = () => {
  const [toggle, setToggle] = useState(false);
  const currentRoute = useLocation().pathname;
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <aside
      className={"bg-white p-3 flex flex-col shadow-2xl min-h-max h-screen"}
    >
      <button className={"btn my-4"} onClick={handleToggle}>
        <i className={"fas fa-bars"}></i>
      </button>
      <Link to={"/"}>
        <button
          className={`flex w-full p-3 hover:text-blue-500 ${
            currentRoute === "/" ? "bg-blue-900 text-white" : ""
          }`}
        >
          <i className="fas fa-home mt-1"></i>
          {toggle ? <span className={"ml-2"}> Home</span> : null}
        </button>
      </Link>
      <Link to={"/wallet"}>
        <button
          className={`flex p-3  align-middle  hover:text-blue-500 ${
            currentRoute === "/wallet" ? "bg-blue-900 text-white" : ""
          }`}
        >
          <i className="fas fa-pie-chart  mt-1"></i>
          {toggle ? <span className={"ml-2"}> Portfolio</span> : null}
        </button>
      </Link>
    </aside>
  );
};
