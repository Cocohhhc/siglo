"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

// hook
import { useFormSession } from "@/src/hook/useFormData";

// componentes
import siglo21Img from "@/public/logo-centro-medico-docente-siglo-21.1d027d8.webp";
import { validForm } from "@/src/hook/formValid";
import InputLogin from "@/src/components/ui/inputs/inputs";
import Button from "@/src/components/ui/button/button";

export default function RegistraitionForm({ onSelect }) {
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userCardId, setUserCardId] = useState("");
  const [userGmail, setUserGmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userDepartament, setUserDepartament] = useState("");

  const { saveData, clearData } = useFormSession();

  // 🔹 Limpia sesión SOLO al entrar al form
  useEffect(() => {
    clearData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: userName,
      lastName: userLastName,
      email: userGmail,
      password: userPassword,
      cardId: userCardId,
      departament: userDepartament,
    };

    saveData(data);
  };

  return (
    <section className="grid place-items-center">        
        <article className="grid place-items-center">
          <div className="z-10 max-w-[50%] pointer-events-none">
            <Image alt="Siglo21 logo" src={siglo21Img} />
          </div>
        </article>

      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center p-12 gap-6">
        <section className="grid grid-cols-2 gap-6">
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
            variant={validForm(userLastName, "string")}
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
        </section>

        <article className="flex gap-x-5 items-center">
          <Button type="submit" variant="primary" value="Entrar" />
          <button type="button" onClick={onSelect}>
            Iniciar Sesion
          </button>
        </article>

      </form>
    </section>
  );
}
