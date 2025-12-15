//Components
import FormSwitcher from "@/src/components/form/pickForm";

//Imagenes
import Image from "next/image";

export default function Home() {

  return (
    <div className="">
      <main className="bg-gray-50 min-h-screen flex items-center justify-center-safe ">
        <section className="min-h-screen flex flex-col items-center justify-center relative">
          <section className="z-1">
            <FormSwitcher />
          </section>
        </section>

        <div className="pointer-events-none ">
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
            }}
          />
        </div>
      </main>
    </div>
  );
}
