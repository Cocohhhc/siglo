'use client'
//Import
import { getData } from "@/src/app/api/routes/route"
import { useState } from "react";
import { useFormSession } from "@/src/hook/useFormData";


///Componentes
import InputLogin from "@/src/components/ui/inputs/inputs";
import Button from "@/src/components/ui/button/button"
import { register } from "@/src/app/api/routes/route"



export default function formularyPacient({  
  setValue, setSecondValue, setThirdValue, setFourtValue, setFifthValue }) {
      const [userName, setUserName] = useState("");
      const [userLastName, setUserLastName] = useState("");
      const [IdNumber, setIdNumber] = useState("");
      const [Birth, dataOfBirth] = useState("");
      const [age, setAge] = useState("");
    

    const handleSubmit = (e) => {
      e.preventDefault();
      
      const data = {
        name: userName,
        lastName: userLastName,
        date_of_birth: Birth,
        IdNumber: IdNumber,
        age: Number(age),
      }

      // register(data)
    }

  return (
    <section
      className="
     flex flex-col items-center justify-between
    gap-6 px-6  
    "
    > 
    <article className="text-2xl w-full">
        <h2>Inserte Datos De Paciente</h2>
    </article>
    
        <form onSubmit={handleSubmit} className="flex flex-row flex-wrap gap-5 p-12 card">
            <InputLogin variant="history" placeholder="Nombre"  name="pacienteName" onChange={(e) => {setUserName(e.target.value), setValue(e.target.value)}}/>

            <InputLogin variant="history" placeholder="Apellido"  name="pacientLastName"  onChange={(e) => {setUserLastName(e.target.value), setSecondValue(e.target.value)}}/>

            <InputLogin variant="history" placeholder="Cedula"  name="pacientId" onChange={(e) => {setIdNumber(e.target.value), setThirdValue(e.target.value)}}/>

            <InputLogin variant="history" type="datetime-local" placeholder="Fecha de nacimiento"  name="dataOfBirth" onChange={(e) => {dataOfBirth(e.target.value), setFourtValue(e.target.value)}}/>

            <InputLogin variant="history" placeholder="Edad" type="number"  name="yearsOld" onChange={(e) => {setAge(e.target.value), setFifthValue(e.target.value)}}/>

            <Button type="submit" variant="primary" value="Guardar" />
                    
        </form>       
    </section>
  );
}
