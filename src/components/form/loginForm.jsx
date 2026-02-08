"use client";
import { useState } from "react";
import Image from "next/image";

//Componentes
import InputLogin from "@/src/components/ui/inputs/inputs";
import Button from "@/src/components/ui/button/button";

//Hooks
import { showValue } from "@/src/hook/formValid";

//Imagenes
import siglo21Img from "@/public/logo-centro-medico-docente-siglo-21.1d027d8.webp";


export default function FormularyFromFormPage({ onSelect, passwordValue }) {
  //States para los inputs
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [gettingPasswordValue, lookingForValue] = useState("")
 

  return (
    <div
      className="
     flex flex-col items-center justify-center
    gap-6 py-12 
    "
    >
      <article className="grid place-items-center">
        <div className="z-10 inset-1 max-w-[50%] pointer-events-none">
          <Image
            alt="Siglo21 logo"
            src={siglo21Img}
            style={{
              maxWidth: "auto",
              height: "auto",
            }}
          />
        </div>
      </article>
      <InputLogin
        name="userName"
        type="text"
        variant={showValue(userName, "string")}
        placeholder="Nombre"
        onChange={(e) => setUserName(e.target.value)}
      />

      <InputLogin
        name="userPassword"
        type="password"
        variant={showValue(userPassword, "password")}
        placeholder="Contraseña"
        onChange={(e) => {setUserPassword(e.target.value), passwordValue(e.target.value)}}
      />

      <article className="gap-2 flex flex-col w-full justify-center items-center">
        <Button width="md" type="submit" variant="primary" value="Entrar" />
        <Button width="md" type="button" value="Registro" variant="secundary" onClick={onSelect}/>
      </article>
    </div>
  );
}
