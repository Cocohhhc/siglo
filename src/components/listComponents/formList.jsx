"use client"
import { useState } from "react";
import FormularyPacient from "../form/pacienteFormulario";
import InputLogin from "../ui/inputs/inputs";
import { showValue } from "@/src/hook/formValid";

export default function FormList({onUpdate, onCancel}) {
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

    const schema = {
      name: "string",
      lastName: "string",
      IdNumber: "idCard",
      fecha_de_nacimiento: "date",
      Edad: "number",
    }
    
    return (
        <>
        <FormularyPacient
          value="Actualizar"
          onSubmit={(e) => onUpdate(e, data, schema)}
          onCancel={onCancel}
          variant="update"
        >
            <InputLogin variant={showValue(name, "string")} placeholder="Nombre" name="name" onChange={(e) => { setName(e.target.value)}} />
        
            <InputLogin variant={showValue(lastName, "string")} placeholder="Apellido" name="lastName" onChange={(e) => { setLastName(e.target.value)}} />
        
            <InputLogin variant={showValue(cardId, "idCard")} placeholder="Cedula" name="IdNumber"  onChange={(e) => { setCardId(e.target.value)}} />
        
            <InputLogin variant={showValue(birth, "date")} type="date" placeholder="Fecha de nacimiento" name="fecha_de_nacimiento" onChange={(e) => { setBirth(e.target.value)}} />
        
            <InputLogin variant={showValue(age, "number")} placeholder="Edad" type="number" name="Edad" onChange={(e) => { setAge(e.target.value)}} />
        </FormularyPacient>
        </>
    )
}