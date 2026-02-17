"use client";
// Services
import { useState, useEffect } from "react";
// Componentes
import FormularyHomePage from "../form/pacienteFormulario"
import InputLogin from "../ui/inputs/inputs"
// Hook
import { showValue } from "@/src/hook/formValid";

export default function FormHome({handleSubmit, setData}) {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cardId, setCardId] = useState("");
    const [birth, setBirth] = useState("");
    const [age, setAge] = useState("");

    const data = {
      name: name,
      lastName: lastName,
      IdNumber: cardId,
      date_of_birth: birth,
      age: age,
    }

    useEffect(() => {
      setData(data);
    }, [name, lastName, cardId, birth, age]);

      
    return (
        <>
         <FormularyHomePage onSubmit={(e) => handleSubmit(data, e)} value="Guardar" variant="primary" text="Inserte Datos De Paciente" description="Ingresa los datos del paciente">
            <div className="flex flex-col gap-2">
              <label htmlFor="pacienteName">Nombre</label>
              <InputLogin width="md" size="sm" variant={showValue(name, "string")} placeholder="Nombre" name="pacienteName" value={name} onChange={(e) => { setName(e.target.value)}} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="pacientLastName">Apellido</label>
              <InputLogin width="md" size="sm" variant={showValue(lastName, "string")} placeholder="Apellido" name="pacientLastName" value={lastName} onChange={(e) => { setLastName(e.target.value)}} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="pacientId">Cedula</label>
              <InputLogin width="md" size="sm" variant={showValue(cardId, "number")} placeholder="Cedula" name="pacientId" value={cardId} onChange={(e) => { setCardId(e.target.value)}} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="dataOfBirth">Fecha de nacimiento</label>
              <InputLogin width="md" size="sm" variant={showValue(birth, "date")} type="datetime-local" placeholder="Fecha de nacimiento" name="dataOfBirth" value={birth} onChange={(e) => { setBirth(e.target.value)}} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="yearsOld">Edad</label>
              <InputLogin width="md" size="sm" variant={showValue(age, "number")} placeholder="Edad" type="number" name="yearsOld" value={age} onChange={(e) => { setAge(e.target.value)}} />
            </div>
            </FormularyHomePage>
        </>
    )
}