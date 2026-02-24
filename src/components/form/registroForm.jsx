"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// hook
import { useFormSession } from "@/src/hook/useFormData";

// componentes 
import siglo21Img from "@/public/logo-centro-medico-docente-siglo-21.1d027d8.webp";
import { showValue, validateData } from "@/src/hook/formValid";
import InputLogin from "@/src/components/ui/inputs/inputs";
import Button from "@/src/components/ui/button/button";
import DropDowm from "@/src/components/ui/dropDown/dropDown"

export default function RegistraitionForm({ onSelect, passwordValue }) {
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userCardId, setUserCardId] = useState(""); 
  const [userGmail, setUserGmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userDepartament, setUserDepartament] = useState("");
  const router = useRouter()

  const [steps, setSteps] = useState({
    step1: false,
    step2: false,
    step3: false,
  });

  const { saveData } = useFormSession();
  
  const data = {
    name: userName,
    lastName: userLastName,
    email: userGmail,
    password: userPassword,
    cardId: userCardId,
    departament: userDepartament,
  };

  const schema = {
    name: "string",
    lastName: "string",
    email: "email",
    password: "password",
    cardId: "number",
    departament: "department",
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    saveData(data);
    router.replace("/home");
  };

  const departament = [
    { id: "1", value: "1", name: "Departamento 1" },
    { id: "2", value: "2", name: "Departamento 2" },
    { id: "3", value: "3", name: "Departamento 3" },
  ];

  return (
    <section className="grid place-items-center">        
        <article className="grid place-items-center">
          <div className="z-10 max-w-[50%] pointer-events-none">
            <Image alt="Siglo21 logo" src={siglo21Img} />
          </div>
        </article>

    <form className="flex flex-wrap justify-center p-12 gap-6">
      <article className="">
        
          
            <article className={`flex flex-wrap gap-2 justify-center items-center ${!steps.step1 ? "" : "hidden"}`}>   
              <InputLogin
                name="userName"
                type="text"
                variant={showValue(userName, "string")}
                placeholder="Nombre"
                onChange={(e) => setUserName(e.target.value)}
              />

              <InputLogin
                name="userLastName"
                type="text"
                variant={showValue(userLastName, "string")}
                placeholder="Apellido"
                onChange={(e) => setUserLastName(e.target.value)}
              />
              
              <DropDowm defaultLabel="Seleccione un departamento" setUserDepartament={setUserDepartament} options={departament}/>
            </article>
            
              <article className={`flex flex-wrap gap-2 justify-center items-center ${steps.step1 ? "" : "hidden"}`}>
                <InputLogin
                  name="userCardId"
                  type="text"
                  variant={showValue(userCardId, "number")}
                  placeholder="Cedula"
                  onChange={(e) => setUserCardId(e.target.value)}
                />

                <InputLogin
                  name="userGmail"
                  type="email"
                  variant={showValue(userGmail, "email")}
                  placeholder="Correo Electronico"
                  onChange={(e) => setUserGmail(e.target.value)}
                />

                <InputLogin
                  name="userPassword"
                  type="password"
                  variant={showValue(userPassword, "password")}
                  placeholder="Contraseña"
                  onChange={(e) => {setUserPassword(e.target.value), passwordValue(e.target.value) }}
                />
          </article>
        </article>
      </form>

      <article className="flex flex-col gap-2 w-full justify-center items-center">
         <div className="flex gap-x-5 items-center">
          {
            !steps.step1 ? (
              <Button width="full" size="md" type="button" variant="secundary" value="Siguiente" onClick={() => setSteps({ ...steps, step1: true })}/>
            ) : (
              <>
              <Button width="full" size="md" type="button" variant="secundary" value="Anterior" onClick={() => setSteps({ ...steps, step1: false })}/>
              </>
            )
          }
        </div>

        <div className="flex flex-col gap-2 w-full justify-center items-center">
          {
            validateData(data, schema) ? (
              <Button width="md" type="submit" variant="primary" value="Entrar" onClick={handleSubmit} />
            ) : (
              <Button width="md" type="button" variant="disabled" value="Entrar" disabled />
            )
          }
          <Button width="md" type="button" variant="secundary" value="Login" onClick={onSelect}/>
        </div>
      </article>
     
    </section>
  );
}
