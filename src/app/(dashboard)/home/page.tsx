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
  const [fiveValue, setSFiveValue] = useState("Edad");
  const pageName = usePageName();


  return (

    <main className="flex flex-col">

      <section className="flex flex-row w-full h-full justify-between gap-5">


        <section className="flex flex-col me-8 mt-4">
          <article className="w-full mb-5">
            <RegistroClinico value={pageName}/>
          </article>

          <article className=" p-3 rounded-md w-full h-auto card  ">
            <HistoriaClinico
              name={value}
              lastName={secondValue}
              cardId={thirdValue}
              birthday={fourtValue}
              age={fiveValue}
            />
          </article>
          <hr className="my-12 text-gray-400" />
          <article className="">
            <FormularyHomePage
              setValue={setValue}
              setSecondValue={setSecondValue}
              setThirdValue={setThirdValue}
              setFourtValue={setFourtValue}
              setSFiveValue={setSFiveValue}
            />
          </article>
        </section>
      </section>
    </main>
  );
}
