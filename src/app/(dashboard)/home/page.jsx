"use client"
//Imports
import { usePageName } from "@/src/hook/usePageName";
import { authServices } from "@/src/services/auth.services";

//Componentes
import HistoriaClinico from "@/src/components/homeComponents/historiaClinico/historia";
import RegistroClinico from "@/src/components/ui/lista/registroClinico";
import FormHome from "@/src/components/homeComponents/formHome";

export default function HomePage() {
  const { register } = authServices();
  const pageName = usePageName();

   // Envia datos del formulario al backend
  const handleSubmit = (e, data) => {
    e.preventDefault();
    register(data);
  };
  return (

        <section className="flex flex-col">
          <article className="w-full mb-5">
            <RegistroClinico value={pageName}/>
          </article>
          {/* Muestro los datos dinamicamente al ingresar datos en el input */}
          <article className="sha p-3 rounded-md w-full h-auto ">
            <HistoriaClinico
              onClick={() => resetValues()}
            />
          </article>
          <hr className="my-12 text-gray-400" />
          {/* Formulario de registro de paciente */}
          <article className="">
           <FormHome 
            handleSubmit={handleSubmit}
           />
          </article>
        </section>
  );
}
