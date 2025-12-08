import { CgProfile } from "react-icons/cg";

//Components
import Description from "@/src/components/ui/doctorDescription/description"
import Target from "@/src/components/ui/target/target"

export default function Account() {
  return (
    <div className="p-4 w-full place-items-start items-center">
      <section className="flex gap-3 p-3 items-end w-full">
        <CgProfile className="w-[6vw] h-auto" />
        <article className="flex gap-2">
          <Target value="Doctor" />
          <Target value="Cliente" />
        </article>
      </section>

      <section className="">
        <article>
          <ul className="
          grid grid-cols-3 grid-flow bg-zinc-100
          p-8 gap-12
          rounded-[2%]
          ">
            <li>
              <Description value="Nombre" />
            </li>

            <li>
              <Description value="Apellido" />
            </li>

            <li>
              <Description value="Cedula" />
            </li>

            <li>
              <Description value="Contraseña" />
            </li>

            <li>
              <Description value="Correo Electronico" />
            </li>

            <li>
              <Description value="Cargo" />
            </li>

            <li>
              <div className="flex flex-row gap-4">
                <Description value="Departamento" />
                <Description value="Departamento" />
              </div>
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}
