import React from "react";
import { Link } from "react-router-dom";

export function Footer(): JSX.Element {
  return (
    <>
      <footer
        className={"mt-auto p-3 border-t flex flex-row justify-end bg-white"}
      >
        <span className={"p-3 text-gray-400"}>Twitter</span>
        <span className={"p-3 text-gray-400"}>
          <Link to={"/about"}>About</Link>
        </span>
        <span className={"p-3 text-gray-400"}>
          <Link to={"/team"}>Team</Link>
        </span>
      </footer>
    </>
  );
}
