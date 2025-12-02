"use client";

//Componentes
// import { settingUserSession } from "@/src/api/auth/auth";
import { useState } from "react";
import InputLogin from "@/src/components/ui/inputs/inputs";
import Button from "@/src/components/ui/button/button";
import { IoMdCheckmark } from "react-icons/io";
import { HiOutlineXMark } from "react-icons/hi2";

import { formSelection } from "@/src/hook/formSelection";
export default function HistoriaClinico() {
  const [userName, setUserName] = useState("");
  const [buttonCheking, setButtonCheking] = useState(false);

  const handleChange = () => {
    const status = formSelection();
    setButtonCheking(status);
  };

  // let buttonCheking = false;

  // const handleChange = (e) => {
  //   buttonCheking = !buttonCheking;

  //   console.log(buttonCheking);
  // };

  const check = <IoMdCheckmark />;
  const decline = <HiOutlineXMark />;

  return (
    <div
      className="bg-zinc-50 flex flex-row flex-wrap gap-15 m-4 p-4 text-[1.1rem] font-medium shadow-md items-center-safe justify-between rounded-lg 
    "
    >
      <section className="">
        <h2>Esteven Jhoan Paula Jose</h2>
      </section>

      <section className="flex flex-row gap-4 items-center-safe">
        <div className="gap-6 flex flex-row">
          <InputLogin variant="history" />
        </div>

        <div className="">
          {!buttonCheking ? (
            <Button variant="decline" value={decline} onClick={handleChange} />
          ) : (
            <Button variant="accept" value={check} onClick={handleChange} />
          )}
        </div>
      </section>
    </div>
  );
}
