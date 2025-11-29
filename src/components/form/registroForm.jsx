"use client";
import { clsx } from "clsx";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

//Componentes y hooks
import siglo21Img from "@/public/logo-centro-medico-docente-siglo-21.1d027d8.webp";
import { validForm } from "@/src/hook/formValid";
import { registreformSelection } from "@/src/hook/formSelection";
import InputLogin from "@/src/components/ui/inputs/inputs";
import Button from "@/src/components/ui/button/button";

export default function RegistraitionForm({ onSelect }) {
  const [userName, setUserName] = useState("");
  const [userlastName, setUserLastName] = useState("");
  const [userCardId, setUserCardId] = useState("");
  const [userGmail, setUserGmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userDepartament, setUserDepartament] = useState("");


  return (
    <div
      className="
    flex flex-wrap items-center place-content-center
    gap-6 py-12 max-w-[50vw]
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
        name="userLastName"
        type="text"
        variant={validForm(userlastName, "string")}
        placeholder="Apellido"
        onChange={(e) => setUserLastName(e.target.value)}
      />

      <InputLogin
        name="userCardId"
        type="text"
        variant={validForm(userCardId, "number")}
        placeholder="Cedula"
        onChange={(e) => setUserCardId(e.target.value)}
      />

      <InputLogin
        name="userGmail"
        type="email"
        variant={validForm(userGmail, "email")}
        placeholder="Correo Electronico"
        onChange={(e) => setUserGmail(e.target.value)}
      />

      <InputLogin
        name="userPassword"
        type="password"
        variant={validForm(userPassword, "password")}
        placeholder="Contraseña"
        onChange={(e) => setUserPassword(e.target.value)}
      />

      <InputLogin
        name="departamentId"
        type="text"
        variant={validForm(userDepartament, "departament")}
        placeholder="Ingrese Departamento"
        onChange={(e) => setUserDepartament(e.target.value)}
      />

      <article className="gap-x-5 flex flex-row items-center-safe">
        <div className="">
          <Button className="" type="submit" variant="primary" value="Entrar" />
        </div>
        <div className="">
          <button type="button" onClick={onSelect}>
            Iniciar Sesion
          </button>
        </div>
      </article>

      <article>
        <div className="z-10 absolute inset-1 pointer-events-none">
          <Image
            alt="Siglo21 logo"
            src={siglo21Img}
            style={{
              maxWidth: "46%",
              height: "auto",
              margin: "10% 0% 0% 27%",
            }}
          />
        </div>
      </article>
    </div>
  );
}
