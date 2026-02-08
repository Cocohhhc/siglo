"use client";
import { useState, useEffect } from "react";



//Componentes
import RegistraitionForm from "@/src/components/form/registroForm";
import FormularyFromFormPage from "@/src/components/form/loginForm";

// Componente que alterna entre el formulario de login y registro
export default function FormSwitcher({passwordValue}) {
  const [selected, setSelected] = useState(false);
  const [getValue, setValuePassword] = useState("");

  useEffect(() => {
    passwordValue(getValue);
  }, [getValue]);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
      <section className="">
        <div className="">
          {selected ? (
            <RegistraitionForm onSelect={handleClick} passwordValue={setValuePassword}/>
          ) : (
            <FormularyFromFormPage onSelect={handleClick} passwordValue={setValuePassword}/>
          )}
        </div>    
      </section>
  );
}
