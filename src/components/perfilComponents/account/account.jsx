import { CgProfile } from "react-icons/cg";
import { useFormSession } from "@/src/hook/useFormData"


//Components
import Description from "@/src/components/ui/doctorDescription/description"
import Target from "@/src/components/ui/target/target"

export default function Account() {
  const { data } = useFormSession();
  console.log(data)

  if (!data) return <p>No hay datos</p>;

  return (
    <div className="p-4 gap-6 w-full flex place-items-start items-center">
      <section className="grid place-items-center gap-3 items-center h-full w-[30%] card">
        <CgProfile className="w-[6vw] h-auto" />
        <article className="flex gap-2">
          <Target value="Doctor" />
          <Target value="Cliente" />
        </article>
      </section>

      <section className="">
        <article>
          <ul className="
          grid grid-cols-3 
          py-8 ps-10  gap-12 card
          rounded-[2%] 
          ">
            <li>
              <Description value={data.name} description="Nombre"/>
            </li>

            <li>
              <Description value={data.lastName} description="Apellido"/>
            </li>

            <li>
              <Description value={data.cardId} description="Cedula"/>
            </li>

            <li>
              <Description value={data.password} description="Contraseña"/>
            </li>

            <li>
              <Description value={data.email} description="Correo Electronico"/>
            </li>

            <li>
              <Description value={data.departament} description="Cargo"/>
            </li>

            <li>
              <div className="flex flex-row gap-4">
                <Description value="Departamento" description="Departamento"/>
                <Description value="Departamento" description="Departamento"/>
              </div>
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}
