"use client";
import { useState } from "react";
import { formSelection } from "@/src/hook/formSelection";
import RegistraitionForm from "./registroForm";
import FormularyFromFormPage from "./loginForm";

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
