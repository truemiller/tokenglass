import { useState } from "react";

export const LeftSidebar = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <aside
      className={"bg-white p-3 border-right shadow-sm d-flex flex-column"}
      style={{ width: "inherit", minHeight: "100vh", height: "100%" }}
    >
      <button className={"btn mx-auto"} onClick={handleToggle}>
        <i className={"fas fa-bars"}></i>
      </button>

      <div className="list-group list-group-flush">
        <a className="list-group-item d-flex p-3">
          <i className="fas fa-home"></i>
          {toggle ? <span className={"ms-2"}> Home</span> : null}
        </a>
        <a className="list-group-item d-flex p-3">
          <i className="fas fa-home"></i>
          {toggle ? <span className={"ms-2"}> Home</span> : null}
        </a>
        <a className="list-group-item d-flex p-3">
          <i className="fas fa-home"></i>
          {toggle ? <span className={"ms-2"}> Home</span> : null}
        </a>
        <a className="list-group-item d-flex p-3">
          <i className="fas fa-home"></i>
          {toggle ? <span className={"ms-2"}> Home</span> : null}
        </a>
        <a className="list-group-item d-flex p-3">
          <i className="fas fa-home"></i>
          {toggle ? <span className={"ms-2"}> Home</span> : null}
        </a>
      </div>

      <button className="btn"></button>
    </aside>
  );
};
