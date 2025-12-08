"use client";
import { getName } from "@/src/api/auth/auth";
import { useState } from "react";


//Componentes
// import { settingUserSession } from "@/src/api/auth/auth";
import InputLogin from "@/src/components/ui/inputs/inputs";
import Button from "@/src/components/ui/button/button";
import { IoMdCheckmark } from "react-icons/io";
import { HiOutlineXMark } from "react-icons/hi2";

//Hook
import { formSelection } from "@/src/hook/formSelection";


export default function HistoriaClinico({name, lastName, cardId, birthday, age}) {
  const [buttonCheking, setButtonCheking] = useState(false);

  const handleChange = () => {
    const status = formSelection();
    setButtonCheking(status);
  };

  const check = <IoMdCheckmark />;
  const decline = <HiOutlineXMark />;

  return (
    <div
      className=" flex flex-row flex-wrap m-4 px-4 text-[1.1rem] font-normal items-center-safe justify-between rounded-lg 
    "
    >
      <section className="">
        <h1 className="mb-4 text-2xl font-medium">Ficha</h1>
        <ul className="grid grid-cols-3 gap-x-10">
          <li>
            <h2>{name}</h2>
          </li>

          <li>
            <h2>{lastName}</h2>
          </li>

          <li>
            <h2>{cardId}</h2>
          </li>

          <li>
            <h2>{birthday}</h2>
          </li>

          <li>
            <h2>{age}</h2>
          </li>
        </ul>
      </section>

      <section className="flex flex-row gap-4 items-center-safe">
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
