import React from "react";
export default function Team(): JSX.Element {
  return (
    <div className={"p-10"}>
      <div className="container mx-auto">
        <div className="flex flex-row flex-wrap">
          <div className="md:w-1/3 ">
            <h2 className={"font-extrabold text-5xl"}>Meet our team</h2>
            Our team is built up of two like-minded individuals looking to make
            crypto more exciting.
          </div>
          <div className="md:w-1/3 sm:w-1/2 w-1/2 text-center">
            <div className="mx-auto">
              <h3 className={"font-extrabold"}>True Miller</h3>
              <img
                src="/team/truemiller.jpg"
                alt=""
                width={128}
                className={"mx-auto rounded-full"}
              />
              <h4>Co-founder</h4>
            </div>
          </div>
          <div className="md:w-1/3 sm:w-1/2 w-1/2 text-center">
            <div className="mx-auto">
              <h3 className={"font-extrabold"}>Thundercat</h3>
              <img
                src="/team/thundercat.jpg"
                alt=""
                width={128}
                className={"mx-auto rounded-full"}
              />
              <h4>Co-founder</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
