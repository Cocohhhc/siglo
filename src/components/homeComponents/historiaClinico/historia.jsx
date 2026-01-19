"use client";
import { getName } from "@/src/app/api/routes/route";
import { useState } from "react";

//Icons
import { CgProfile } from "react-icons/cg";

//Componentes
// import { settingUserSession } from "@/src/api/auth/auth";
import InputLogin from "@/src/components/ui/inputs/inputs";
import Button from "@/src/components/ui/button/button";
import { IoMdCheckmark } from "react-icons/io";
import { HiOutlineXMark } from "react-icons/hi2";

//Hook
import { formSelection } from "@/src/hook/formSelection";


export default function HistoriaClinico({name, lastName, cardId, birthday, age, reset}) {  

  const handleChange = () => {
    return reset(true);
  };

  const check = <IoMdCheckmark />;
  const decline = <HiOutlineXMark />;

  return (
    <section>
      <h1 className="text-3xl mb-2">Ficha</h1>
    <div
      className=" flex flex-row flex-wrap p-4 text-[1.1rem] font-normal items-center-safe justify-between rounded-lg card 
      max-md:grid place-items-center 
    "
    >
      <section className="">
        <ul className="flex flex-wrap items-center gap-x-10">
          <li>
            <CgProfile className="text-6xl"/>
          </li>
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

      <section className="flex flex-row gap-4 items-center-safe max-md:w-full">
        <div className="max-md:w-full">
          <Button variant="decline" value={decline} onClick={handleChange} />
        </div>
      </section>
    </div>
    </section>
  );
}
