import { CgProfile } from "react-icons/cg";
import { useFormSession } from "@/src/hook/useFormData";

//Icons
import { RiIdCardFill } from "react-icons/ri";
import { TbMedicalCrossFilled } from "react-icons/tb";




//Components
import Description from "@/src/components/ui/doctorDescription/description";
import Target from "@/src/components/ui/target/target";
import Division from "@/src/components/ui/division/division"

export default function Account() {
  const { data } = useFormSession();
  console.log(data)

  if (!data) return <div className="grid place-items-center-safe text-2xl font-bold text-rose-600"><p>❌ El usuario no ha ingresado datos ❌</p></div>;

  return (
    <div className="">
      <section className="p-4 w-full gap-8 grid items-center">
        {/* Departamento y Cargo del perfil */}
        <section className="flex gap-4 items-center card">
          <CgProfile className="w-[6vw] h-auto" />
          <article className="flex gap-2">
            <Target value="Doctor" />
            <Target value="Cliente" />
          </article>
        </section>
        {/* Información del perfil */}
        <section className="">
          <article className="
          flex flex-row items-center justify-around max-md:grid gap-6
          p-8  card relative     
          rounded-[2%] 
          ">
            <div className="grid gap-2">
              <Description value={data.name} description="Nombre"/>
              <Description value={data.lastName} description="Apellido"/>
              <Description value={data.cardId} description="Cedula"/>
            </div>

              <div className="flex items-center justify-center bg-linear-(--hr-gradient) rotate-90 h-1 w-[10%] max-md:hidden">
                <TbMedicalCrossFilled className="text-(--color-600)"/>
              </div>

            <div className="grid gap-2">
              <Description value={data.password} description="Contraseña"/>
              <Description value={data.email} description="Correo Electronico"/>
              <Description value={data.departament} description="Cargo"/>
            </div>

              
              <div className="flex items-center justify-center bg-linear-(--hr-gradient)  w-[10%] rotate-90  h-1 max-md:hidden">
                <TbMedicalCrossFilled className="text-(--color-600)"/>
              </div>

            <div className="">
              <div className="flex flex-row gap-4">
                <Description value="Departamento" description="Departamento"/>
                <Description value="Departamento" description="Departamento"/>
              </div>
            </div>
          </article>
        </section>
      </section>
    </div>
  );
}
