import { CgProfile } from "react-icons/cg";
import { useFormSession } from "@/src/hook/useFormData";

//Components
import Description from "@/src/components/ui/doctorDescription/description";
import Target from "@/src/components/ui/target/target";
import NotFound from "@/src/components/ui/error/notFound";

export default function Account() {
  const { data } = useFormSession();

  if (!data) {
    return <NotFound message="No se encontraron datos" />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:max-h-[35vh]">
      
      {/* Main Profile Info */}
      <article className="w-full p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 col-span-1 lg:col-span-2">
        
        {/* Avatar with Tailwind gradient */}
        <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-linear-to-br from-(--color-400) to-(--color-600) flex items-center justify-center shrink-0 shadow-lg border-4 border-white">
          <CgProfile className="text-5xl md:text-6xl lg:text-7xl text-white" />
        </div>

        <div className="flex flex-col gap-4 text-center md:text-left flex-1 min-w-0 w-full">
            <div className="flex flex-col md:flex-row md:items-center gap-2">             
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight truncate">
                {data.name} {data.lastName}
              </h2>
              <Target size="sm" variant="primary" value="Activo" className="!w-fit mx-auto md:mx-0" />
            </div>  

            <div className="flex">
              <div className="w-full flex flex-col gap-2">
                <div className="">
                  <Target size="sm" variant="primary" value="Contacto" className="!w-fit" /> 
                  <Description value={data.email} description="Email" variant="minimal" size="sm" />
                </div>
                <div className="">
                  <Target size="sm" variant="primary" value="Identidad" className="!w-fit" /> 
                  <Description value={data.cardId} description="Cédula" variant="minimal" size="sm" />
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <div className="">
                  <Target size="sm" variant="primary" value="Departamento" className="!w-fit" />
                  <Description value={data.departament} description="Departamento" variant="minimal" size="sm" />
                </div>
                <div className="">
                  <Target size="sm" variant="primary" value="Contrasena" className="!w-fit" />
                  <Description value={data.password} description="Contrasena" variant="minimal" size="sm" />
                </div>
              </div>
            </div>                          
        </div>
      </article>

    </div>
  );
}
