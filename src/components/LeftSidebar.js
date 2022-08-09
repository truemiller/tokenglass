import { useState } from "react";

export const LeftSidebar = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <aside
      className={"bg-white p-3 flex flex-col shadow-2xl min-h-max h-screen "}
    >
      <button className={"btn"} onClick={handleToggle}>
        <i className={"fas fa-bars"}></i>
      </button>
      <a className="flex p-3" href={"/"}>
        <i className="fas fa-home"></i>
        {toggle ? <span className={"ml-2"}> Home</span> : null}
      </a>
      <a className="flex p-3" href={"/"}>
        <i className="fas fa-pie-chart"></i>
        {toggle ? <span className={"ml-2"}> Dashboard</span> : null}
      </a>
    </aside>
  );
};
