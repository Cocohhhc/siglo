"use client"
//Imports
import { usePageName } from "@/src/hook/usePageName";
import { authServices } from "@/src/services/auth.services";

//Componentes
import HistoriaClinico from "@/src/components/homeComponents/historiaClinico/historia";
import RegistroClinico from "@/src/components/ui/lista/registroClinico";
import FormHome from "@/src/components/homeComponents/formHome";
import { useState } from "react";

export default function HomePage() {
  const [data, setData] = useState({});
  const { register } = authServices();
  const pageName = usePageName();

   // Envia datos del formulario al backend
  const handleSubmit = (e, data) => {
    e.preventDefault();
    register(data);
    resetValues();
  };

  const resetValues = () => {
    setData({});
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
          data={data}
        />
      </article>

      {/* Separador */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(var(--hr-gradient))' }}></div>

      {/* Formulario de registro de paciente */}
      <article>
        <FormHome 
          handleSubmit={handleSubmit}
        />
      </article>
    </section>
  );
}
