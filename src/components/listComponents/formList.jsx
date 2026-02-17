"use client"
import { useState, useEffect } from "react";
import FormularyPacient from "../form/pacienteFormulario";
import InputLogin from "../ui/inputs/inputs";

export default function FormList({onUpdate, setData, onCancel}) {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cardId, setCardId] = useState("");
    const [birth, setBirth] = useState("");
    const [age, setAge] = useState("");
    
    const data = {
        name: name,
        lastName: lastName,
        IdNumber: cardId,
        fecha_de_nacimiento: birth,
        Edad: Number(age),
    }

    useEffect(() => {
        setData(data);
    }, [name, lastName, cardId, birth, age]);
    
    return (
        <>
        <FormularyPacient
          value="Actualizar"
          onSubmit={onUpdate}
          onCancel={onCancel}
          variant="update"
        >
            <InputLogin variant="history" placeholder="Nombre" name="pacienteName" onChange={(e) => { setName(e.target.value)}} />
        
            <InputLogin variant="history" placeholder="Apellido" name="pacientLastName" onChange={(e) => { setLastName(e.target.value)}} />
        
            <InputLogin variant="history" placeholder="Cedula" name="pacientId" onChange={(e) => { setCardId(e.target.value)}} />
        
            <InputLogin variant="history" type="date" placeholder="Fecha de nacimiento" name="dataOfBirth" onChange={(e) => { setBirth(e.target.value)}} />
        
            <InputLogin variant="history" placeholder="Edad" type="number" name="yearsOld" onChange={(e) => { setAge(e.target.value)}} />
        </FormularyPacient>
        </>
    )
}