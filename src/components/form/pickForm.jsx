"use client";
import { useState } from "react";
import Image from "next/image";
import doctor from "@/public/imagenDoctorLoginPage.png";
import doctorClosingEyes from "@/public/doctorClosingEyes.png";


//Componentes
import RegistraitionForm from "@/src/components/form/registroForm";
import FormularyFromFormPage from "@/src/components/form/loginForm";

//Hooks
import { formSelection } from "@/src/hook/formSelection";


export default function FormSwitcher() {
  const [selected, setSelected] = useState(false);
  const [getValue, setValuePassword] = useState("")


  const handleClick = () => {
    const result = formSelection();
    setSelected(result); // <- Aquí React SI se actualiza
  };

  return (
    <main className="grid place-items-center">
       <section className="
       grid grid-cols-2 pe-10 place-content-center
       bg-(--color-50) 
       w-[80%]  rounded-2xl
       ">
      <div className="relative">
        <div className="bg-(--color-600) h-full w-[55%] rounded-tl-2xl rounded-bl-2xl">
          {
            getValue === "" ?
            <Image
                alt="Cargando fondo"
                src={doctor}
                style={{
                  width: "100%",
                  height: "400px",
                  position: "absolute",
                  top: "2%",
                  left: "5%",
                }}
              />
              :
              <Image
                alt="Cargando fondo"
                src={doctorClosingEyes}
                style={{
                  width: "100%",
                  height: "400px",
                  position: "absolute",
                  top: "2%",
                  left: "5%",
                }}
              />
          }
          </div>
        </div>
        <div className="w-full ">
        {selected ? (
          <RegistraitionForm onSelect={handleClick} passwordValue={setValuePassword}/>
        ) : (
          <FormularyFromFormPage onSelect={handleClick} passwordValue={setValuePassword}/>
        )}
        </div>    
      </section>
    </main>
  );
}
