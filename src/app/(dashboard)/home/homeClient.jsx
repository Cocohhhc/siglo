"use client"
//Hooks
import { useState } from "react";
import { usePageName } from "@/src/hook/usePageName";

//Actions
import { registerPatient } from "@/src/actions/home.page.actions";

//Components
import HistoriaClinico from "@/src/components/homeComponents/historiaClinico/historia";
import RegistroClinico from "@/src/components/ui/lista/registroClinico";
import FormHome from "@/src/components/homeComponents/formHome";
import Division from "@/src/components/ui/division/division";

export default function HomeClient() {
  const pageName = usePageName();

   // Envia datos del formulario al backend
  const handleSubmit = async (e, data) => {
    e.preventDefault();
    await registerPatient(data);
  };


  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
      <article>
        <RegistroClinico value={pageName}/>
      </article>

      {/* Ficha del paciente */}
      <article>
        <HistoriaClinico
          onClick={() => resetValues()}
        />
      </article>

      {/* Separador */}
      <Division />

      {/* Formulario de registro de paciente */}
      <article>
        <FormHome 
          handleSubmit={handleSubmit}
        />
      </article>
    </section>
  );
}
