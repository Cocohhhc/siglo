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
import InputLogin from "@/src/components/ui/inputs/inputs";
import Button from "@/src/components/ui/button/button";
import { IoMdCheckmark } from "react-icons/io";


export default function HistoriaClinico({ onClick }) {

  const decline = <FaTrash />;

  const [data, setData] = useState({
    name: "",
    lastName: "",
    IdNumber: "",
    fechaDeNacimiento: "",
    age: "",
  });

  const fields = [
    { icon: <MdDriveFileRenameOutline />, label: "Nombre" },
    { icon: <MdDriveFileRenameOutline />, label: "Apellido" },
    { icon: <FaRegAddressCard />, label: "Cédula" },
    { icon: <BsCalendar2Date />, label: "Fecha de nacimiento" },
    { icon: <BsCalendar2Date />, label: "Edad" },
  ];

  return (
    <section>
      <div className="flex flex-col mb-4">
        <h1 className="text-xl font-bold" style={{ color: 'var(--color-900)' }}>Ficha</h1>
        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Visualiza la ficha del paciente</p>
      </div>

      <div className="rounded-2xl bg-white p-5"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <div className="flex items-center justify-between gap-4 max-md:flex-col">
          
          {/* Perfil + campos */}
          <div className="flex items-center gap-6 flex-wrap">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--color-200), var(--color-300))' }}
            >
              <CgProfile className="text-3xl" style={{ color: 'var(--color-700)' }} />
            </div>

            {/* Campos */}
            <div className="flex flex-wrap items-center gap-3">
              {fields.map((field, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: 'var(--color-50)', color: 'var(--color-800)' }}
                >
                  <span className="text-sm" style={{ color: 'var(--color-500)' }}>{field.icon}</span>
                  <span className="text-sm font-medium">{field.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Acción */}
          <div className="shrink-0 max-md:w-full">
            <Button width="full" size="sm" variant="decline" value={decline} onClick={() => {onClick()}} />
          </div>
        </div>
      </div>
    </section>
  );
}
