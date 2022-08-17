import React, { useContext, useState } from "react";
import { AddressContext } from "../../App";
import { API_URL, APP_NAME } from "../../consts/config";
export function GenericProposalForm(): JSX.Element {
  const address = useContext(AddressContext);
  const [inputs, setInputs] = useState<any>({});

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(`${API_URL}/proposals/create`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: inputs.title,
        description: inputs.description,
        user: address,
      }),
    }).then((r) => window.location.reload());
  };

  return (
    <form className={"flex flex-col"} onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name={"title"}
        onChange={handleChange}
        className={"p-3 bg-gray-100 rounded-xl"}
      />

      <label htmlFor="description">Description</label>
      <textarea
        name={"description"}
        onChange={handleChange}
        rows={20}
        className={"p-3 bg-gray-100 rounded-xl"}
      />
      <button
        type={"submit"}
        className={
          "p-3 bg-blue-700 text-white hover:bg-blue-900 rounded-xl mt-3 "
        }
      >
        Submit
      </button>
    </form>
  );
}
