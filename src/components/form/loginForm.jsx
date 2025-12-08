"use client";
import { useState } from "react";
import Image from "next/image";

//Componentes
import InputLogin from "@/src/components/ui/inputs/inputs";
import Button from "@/src/components/ui/button/button";

//Hooks
import { validForm } from "@/src/hook/formValid";

//Imagenes
import siglo21Img from "@/public/logo-centro-medico-docente-siglo-21.1d027d8.webp";


export default function FormularyFromFormPage({ onSelect }) {
  //States para los inputs
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <div
      className="
     flex flex-col items-center justify-between
    gap-6 py-12 px-6 
    rounded-lg bg-green-100/80 
    "
    >
      <InputLogin
        name="userName"
        type="text"
        variant={validForm(userName, "string")}
        placeholder="Nombre"
        onChange={(e) => setUserName(e.target.value)}
      />

      <InputLogin
        name="userPassword"
        type="password"
        variant={validForm(userPassword, "password")}
        placeholder="Contraseña"
        onChange={(e) => setUserPassword(e.target.value)}
      />

      <article className="gap-x-5 flex flex-row items-center-safe">
        <div className="">
          <Button className="" type="submit" variant="primary" value="Entrar" />
        </div>
        <div className="">
          <button type="button" onClick={onSelect}>
            Registro
          </button>
        </div>
      </article>

      <article>
        <div className="z-10 absolute inset-1 pointer-events-none">
          <Image
            alt="Siglo21 logo"
            src={siglo21Img}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      </article>
    </div>
  );
}
