"use client";
import { getName } from "@/src/routes/route";
import { useState, useEffect } from "react";

//Icons
import { CgProfile } from "react-icons/cg";


//Componentes
// import { settingUserSession } from "@/src/api/auth/auth";
import InputLogin from "@/src/components/ui/inputs/inputs";
import Button from "@/src/components/ui/button/button";
import { IoMdCheckmark } from "react-icons/io";
import { HiOutlineXMark } from "react-icons/hi2";


export default function HistoriaClinico({ name, lastName, cardId, birthday, age, onClick }) {

  const check = <IoMdCheckmark />;
  const decline = <HiOutlineXMark />;


  return (
    <section>
      <h1 className="text-(length:--h1) mb-2">Ficha</h1>
      <div
        className=" flex flex-row flex-wrap p-4 text-[1.1rem] font-normal items-center-safe justify-between rounded-lg card 
      max-md:grid place-items-center 
    "
      >
        <section className="">
          <ul className="flex flex-wrap items-center gap-x-10">
            <li>
              <CgProfile className="text-6xl" />
            </li>
            <li>  
              <h2>{name ? name : "Nombre"}</h2>
            </li>

            <li>
              <h2>{lastName ? lastName : "Apellido"}</h2>
            </li>

            <li>
              <h2>{cardId ? cardId : "Cedula"}</h2>
            </li>

            <li>
              <h2>{birthday ? birthday : "Fecha de nacimiento"}</h2>
            </li>

            <li>
              <h2>{age ? age : "Edad"}</h2>
            </li>
          </ul>
        </section>

        <section className="flex flex-row gap-4 items-center-safe max-md:w-full">
          <div className="max-md:w-full">
            <Button width="md" size="lg" variant="decline" value={decline} onClick={() => {onClick()}} />
          </div>
        </section>
      </div>
    </section>
  );
}
