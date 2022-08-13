import React from "react";

export default function Proposals(): JSX.Element {
  return (
    <>
      <div className="p-10">
        <h1 className="text-6xl font-extrabold mb-5">Proposals</h1>
        <div className="grid grid-cols-4">
          <div className="col-span-3">
            <h2 className={"text-5xl"}>Current Proposals</h2>
          </div>
          <div className="col-span-1">
            <h2 className={"text-5xl "}>Submit</h2>
            <form
              action="#"
              onSubmit={(e) => alert(e)}
              className={"flex flex-col"}
            >
              <label htmlFor="" className={"py-3"}>
                Bitch
              </label>
              <input type="text" className={"shadow p-3"} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
