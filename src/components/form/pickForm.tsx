"use client";
import { useState } from "react";
//Componentes
import RegistraitionForm from "@/src/components/form/registroForm";
import FormularyFromFormPage from "@/src/components/form/loginForm";

//Hooks
import { formSelection } from "@/src/hook/formSelection";

export default function FormSwitcher() {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    const result = formSelection();
    setSelected(result); // <- Aquí React SI se actualiza
  };

  return (
    <>
      {selected ? (
        <RegistraitionForm onSelect={handleClick} />
      ) : (
        <FormularyFromFormPage onSelect={handleClick} />
      )}
    </>
  );
}
