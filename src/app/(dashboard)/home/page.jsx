"use client"
//Imports
import { useState } from "react";
import { usePageName } from "@/src/hook/usePageName";
//Componentes
import HistoriaClinico from "@/src/components/homeComponents/historiaClinico/historia";
import RegistroClinico from "@/src/components/ui/lista/registroClinico";
import FormularyHomePage from "@/src/components/form/pacienteFormulario"

export default function HomePage() {
  const [value, setValue] = useState("Nombre");
  const [secondValue, setSecondValue] = useState("Apellido");
  const [thirdValue, setThirdValue] = useState("Numero de Cedula");
  const [fourtValue, setFourtValue] = useState("Año De Nacimeinto");
  const [fiveValue, setFiveValue] = useState("Edad"); 
  const [resetButton, setResetButton] = useState(false);
  const pageName = usePageName();

  // Mantiene la vista de datos siempre en su valor inicial
  const resetValues = () => {
     if (!value ||
      !secondValue ||
      !thirdValue ||
      !fourtValue ||
      !fiveValue || resetButton) {
      setValue("Nombre")
      setSecondValue("Apellido")
      setThirdValue("Numero de Cedula")
      setFourtValue("Año De Nacimeinto")
      setFiveValue("Edad");
      setResetButton(false);
    };
  };
  resetValues();
  // if(resetButton) buttonReset();
  return (

        <section className="flex flex-col mt-4">
          <article className="w-full mb-5">
            <RegistroClinico value={pageName}/>
          </article>
          {/* Muestro los datos dinamicamente al ingresar datos en el input */}
          <article className="sha p-3 rounded-md w-full h-auto ">
            <HistoriaClinico
              name={value}
              lastName={secondValue}
              cardId={thirdValue}
              birthday={fourtValue}
              age={fiveValue}
              reset={setResetButton}
            />
          </article>
          <hr className="my-12 text-gray-400" />
          {/* Formulario de registro de paciente */}
          <article className="">
            <FormularyHomePage
              setValue={setValue}
              setSecondValue={setSecondValue}
              setThirdValue={setThirdValue}
              setFourtValue={setFourtValue}
              setFifthValue={setFiveValue}
              reset={resetButton}
            />
          </article>
        </section>
  );
}
