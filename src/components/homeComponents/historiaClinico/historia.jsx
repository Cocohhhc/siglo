"use client";
import { getName } from "@/src/routes/route";
import { useState, useEffect } from "react";

//Icons
import { CgProfile } from "react-icons/cg";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

//Componentes
// import { settingUserSession } from "@/src/api/auth/auth";
import InputLogin from "@/src/components/ui/inputs/inputs";
import Button from "@/src/components/ui/button/button";
import { IoMdCheckmark } from "react-icons/io";


export default function HistoriaClinico({ onClick }) {

  const check = <IoMdCheckmark />;
  const decline = <FaTrash />;

  const [data, setData] = useState({
    name: "",
    lastName: "",
    IdNumber: "",
    fechaDeNacimiento: "",
    age: "",
  });

  return (
    <section>
      <div className="flex flex-col mb-2">
        <h1 className="text-(length:--h1)">Ficha</h1>
        <p className="text-[1rem] ">Visualiza la ficha del paciente</p>
      </div>
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
            <li className="flex items-center gap-2"> 
              <MdDriveFileRenameOutline />
              <h2>{"Nombre"}</h2>
            </li>

            <li className="flex items-center gap-2">
              <MdDriveFileRenameOutline />
              <h2>{"Apellido"}</h2>
            </li>

            <li className="flex items-center gap-2">
              <FaRegAddressCard />
              <h2>{"Cedula"}</h2>
            </li>

            <li className="flex items-center gap-2">
              <BsCalendar2Date />
              <h2>{"Fecha de nacimiento"}</h2>
            </li>

            <li className="flex items-center gap-2">
              <BsCalendar2Date />
              <h2>{"Edad"}</h2>
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
