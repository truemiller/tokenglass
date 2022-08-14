import React from "react";

export function Footer(): JSX.Element {
  return (
    <>
      <footer
        className={"mt-auto p-3 border-t flex flex-row justify-end bg-white"}
      >
        <span className={"p-3 text-gray-400"}>Twitter</span>
        <span className={"p-3 text-gray-400"}>About</span>
        <span className={"p-3 text-gray-400"}>Team</span>
      </footer>
    </>
  );
}
