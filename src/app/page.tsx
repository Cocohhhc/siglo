"use client";
import { useState } from "react";

//Componentes
import FormSwitcher from "@/src/components/form/pickForm";

//Imagenes
import Image from "next/image";
import doctor from "@/public/imagenDoctorLoginPage.png";
import doctorClosingEyes from "@/public/doctorClosingEyes.png";

// Pagina Login y Registro
export default function  Home() {
  const [passwordValue, setPasswordValue] = useState(false);

  return (
    <div className="">
      <main className="">
        
          <section className="flex items-center h-screen">
            <article className="w-1/2 h-full bg-[var(--color-900)]/88 flex items-center justify-center">
            {
              passwordValue ? (
                <Image alt="Doctor" src={doctorClosingEyes} style={{ width: "100%", height: "auto" }}/>
              ) : (
                <Image alt="Doctor" src={doctor} style={{ width: "100%", height: "auto" }}/>
              )
            }
            </article>

            <article className="w-1/2 h-full bg-[var(--color-50)] flex items-center justify-center">
              <FormSwitcher passwordValue={setPasswordValue} />
            </article>
          </section>

        <section className="pointer-events-none">
          <Image
            width={1000}
            height={1000}
            alt="Cargando fondo"
            src="/fondoSigloForm.webp"
            fetchPriority="high"
            loading="eager"
            style={{
              position: "absolute",
              objectFit: "cover",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              zIndex: -1,
            }}
          />
        </section>
      </main>
    </div>
  );
}
