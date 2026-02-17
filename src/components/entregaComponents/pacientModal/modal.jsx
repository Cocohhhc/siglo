import Description from "@/src/components/ui/doctorDescription/description";
import { TbMedicalCrossFilled } from "react-icons/tb";

export default function ModalPacient({
    info
}) {
    return (
        <section className="">
          <article className="
          flex flex-row items-center justify-around max-md:grid gap-6
          p-8 card bg-(--color-50) relative     
          rounded-[10%] w-full
          ">
            <div className="grid gap-2">
              <Description value={info.pacientes.name} description="Nombre"/>
              <Description value={info.pacientes.lastName} description="Apellido"/>
              <Description value={info.pacientes.idNumber} description="Cedula"/>
            </div>

            <div className="flex items-center justify-center bg-linear-(--hr-gradient) h-full w-[6%] py-16 max-md:hidden">
                <TbMedicalCrossFilled className="text-(--color-600)"/>
            </div>

            <div className="grid gap-2">
              <Description value={info.pacientes.fechaDeNacimiento} description="Fecha de nacimiento"/>
              <Description value={info.pacientes.edad} description="Edad"/>
            </div>
          </article>
        </section>
    )
}