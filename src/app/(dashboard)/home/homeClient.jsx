"use client";

import { usePageName } from "@/src/hook/usePageName";
import { validateData } from "@/src/hook/formValid";
import { useState, useEffect } from "react";
import { registerPatient } from "@/src/actions/home.page.actions";

import HistoriaClinico from "@/src/components/homeComponents/historiaClinico/historia";
import RegistroClinico from "@/src/components/ui/lista/registroClinico";
import FormHome from "@/src/components/homeComponents/formHome";
import Division from "@/src/components/ui/division/division";
import ErrorComponent from "@/src/components/ui/error/errorComponent";

export default function HomeClient() {
  const pageName = usePageName();

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [type, setType] = useState("success" | "error" | null);
  const [showMessage, setShowMessage] = useState(false);
  const [paciente, setPaciente] = useState({
    name: "",
    lastName: "",
    IdNumber: "",
    date_of_birth: "",
    age: "",
  });
  const [lastPaciente, setLastPaciente] = useState(paciente);
  const [clear, setClear] = useState(false);

  const handleSubmit = async (e, schema) => {
    e.preventDefault();
    
    if (!validateData(paciente, schema)) {
      setMessage("Debe ingresar todos los campos correctamente");
      setType("error");
      setShowMessage(true);
      hideMessage();
      return;
    }

    setLoading(true);

    const res = await registerPatient(paciente);

    setLoading(false);

    if (res.ok) {
      setMessage(res.data?.message || res.message || "Operación realizada correctamente");
      setType("success");
    } else {
      setMessage(res.message || "Ocurrió un error inesperado");
      setType("error");
    }

    setShowMessage(true);
    hideMessage();
  };

  // 🔥 Oculta mensaje automáticamente
  const hideMessage = () => {
    setTimeout(() => {
      setShowMessage(false);
      setType(null);
      setMessage("");
    }, 3000); // 3 segundos
  };

  const handleDecline = () => {
    setPaciente(lastPaciente);
    setClear(true);
  }

  useEffect(() => {
    if(clear){
      setClear(false);
    }
  }, [clear]);

  return (
    <section className="flex flex-col gap-6">

      <article>
        <RegistroClinico value={pageName} />
      </article>

      <article>
        <HistoriaClinico onClick={handleDecline} paciente={paciente} />
      </article>

      <Division />

      <article>
        <FormHome
          handleSubmit={handleSubmit}
          paciente={(paciente) => setPaciente(paciente)}
          clear={clear}
          loading={loading}
        />

        {showMessage && (
          <ErrorComponent
            message={message}
            type={type}
          />
        )}
      </article>
    </section>
  );
}