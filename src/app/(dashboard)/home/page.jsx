"use client"
//Imports
import { useState } from "react";
import { usePageName } from "@/src/hook/usePageName";
import { authServices } from "@/src/services/auth.services";
//Componentes
import HistoriaClinico from "@/src/components/homeComponents/historiaClinico/historia";
import RegistroClinico from "@/src/components/ui/lista/registroClinico";
import FormularyHomePage from "@/src/components/form/pacienteFormulario"
import InputLogin from "@/src/components/ui/inputs/inputs"

// Icons
import { FaUser } from "react-icons/fa";

export default function HomePage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cardId, setCardId] = useState("");
  const [birth, setBirth] = useState("");
  const [age, setAge] = useState("");

  const { register } = authServices();
  const pageName = usePageName();


  // Mantiene la vista de datos siempre en su valor inicial
  const resetValues = () => {
     setName("");
     setLastName("");
     setCardId("");
     setBirth("");
     setAge("");
     return true;
  };

   // Envia datos del formulario al backend
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      lastName: lastName,
      date_of_birth: birth,
      IdNumber: cardId,
      age: Number(age),
    }

    for (const paciente in data) {
      if (data[paciente] === "" || data[paciente] === 0) {
        alert(`Por favor complete el campo de ${paciente}`);
        return;
      } else {
        register(data);
        return;
      }
    }
  };
  return (

        <section className="flex flex-col">
          <article className="w-full mb-5">
            <RegistroClinico value={pageName}/>
          </article>
          {/* Muestro los datos dinamicamente al ingresar datos en el input */}
          <article className="sha p-3 rounded-md w-full h-auto ">
            <HistoriaClinico
              name={name}
              lastName={lastName}
              cardId={cardId}
              birthday={birth}
              age={age}
              onClick={() => resetValues()}
            />
          </article>
          <hr className="my-12 text-gray-400" />
          {/* Formulario de registro de paciente */}
          <article className="">
            <FormularyHomePage onSubmit={handleSubmit} value="Guardar">
              <InputLogin variant="history" placeholder="Nombre" name="pacienteName" value={name} onChange={(e) => { setName(e.target.value)}} />

              <InputLogin variant="history" placeholder="Apellido" name="pacientLastName" value={lastName} onChange={(e) => { setLastName(e.target.value)}} />

              <InputLogin variant="history" placeholder="Cedula" name="pacientId" value={cardId} onChange={(e) => { setCardId(e.target.value)}} />

              <InputLogin variant="history" type="datetime-local" placeholder="Fecha de nacimiento" name="dataOfBirth" value={birth} onChange={(e) => { setBirth(e.target.value)}} />

              <InputLogin variant="history" placeholder="Edad" type="number" name="yearsOld" value={age} onChange={(e) => { setAge(e.target.value)}} />
            </FormularyHomePage>
          </article>
        </section>
  );
}
