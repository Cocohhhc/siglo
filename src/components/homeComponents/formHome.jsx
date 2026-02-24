"use client";
// Services
import { useState, useEffect } from "react";
// Componentes
import FormularyHomePage from "../form/pacienteFormulario"
import InputLogin from "../ui/inputs/inputs"
// Hook
import { showValue } from "@/src/hook/formValid";

export default function FormHome({handleSubmit, paciente, clear}) {
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

    const schema = {
      name: "string",
      lastName: "string",
      IdNumber: "idCard",
      date_of_birth: "date",
      age: "number",
    }

    useEffect(() => {       
      paciente(data);
    }, [name, lastName, cardId, birth, age]);

    useEffect(() => {
      if(clear){
        setName("");
        setLastName("");
        setCardId("");
        setBirth("");
        setAge("");
      }
    }, [clear]);
    
    return (
        <FormularyHomePage 
          onSubmit={(e) => !data ? alert("Debes llenar todos los campos") : handleSubmit(e, schema)} 
          value="Guardar" 
          variant="primary" 
          text="Inserte Datos De Paciente" 
          description="Ingresa los datos del paciente"
        >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="pacienteName" className="text-sm font-medium" style={{ color: 'var(--color-800)' }}>Nombre</label>
              <InputLogin variant={showValue(name, "string")} placeholder="Nombre" name="pacienteName" value={name} onChange={(e) => { setName(e.target.value)}} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="pacientLastName" className="text-sm font-medium" style={{ color: 'var(--color-800)' }}>Apellido</label>
              <InputLogin variant={showValue(lastName, "string")} placeholder="Apellido" name="pacientLastName" value={lastName} onChange={(e) => { setLastName(e.target.value)}} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="pacientId" className="text-sm font-medium" style={{ color: 'var(--color-800)' }}>Cédula</label>
              <InputLogin variant={showValue(cardId, "idCard")} placeholder="Cédula" name="pacientId" value={cardId} onChange={(e) => { setCardId(e.target.value)}} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="dataOfBirth" className="text-sm font-medium" style={{ color: 'var(--color-800)' }}>Fecha de nacimiento</label>
              <InputLogin variant={showValue(birth, "date")} type="date" placeholder="Fecha de nacimiento" name="dataOfBirth" value={birth} onChange={(e) => { setBirth(e.target.value)}} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="yearsOld" className="text-sm font-medium" style={{ color: 'var(--color-800)' }}>Edad</label>
              <InputLogin variant={showValue(age, "number")} placeholder="Edad" type="number" name="yearsOld" value={age} onChange={(e) => { setAge(e.target.value)}} />
            </div>
        </FormularyHomePage>
    )
}