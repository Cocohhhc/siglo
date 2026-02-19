import { CgProfile } from "react-icons/cg";
import { useFormSession } from "@/src/hook/useFormData";

//Icons
import { TbMedicalCrossFilled } from "react-icons/tb";

//Components
import Description from "@/src/components/ui/doctorDescription/description";
import Target from "@/src/components/ui/target/target";
import NotFound from "@/src/components/ui/notFound/notFound";

export default function Account() {
  const { data } = useFormSession();

  return (
    <div>
      {
        !data ? (
          <NotFound message="No se encontraron datos"/>
        ) : (
          <section className="flex flex-col gap-6 mt-4">

        {/* Perfil header card */}
        <section className="rounded-2xl bg-white p-5"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div className="flex items-center gap-5">
            {/* Avatar grande */}
            <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--color-400), var(--color-600))' }}
            >
              <CgProfile className="text-4xl text-white" />
            </div>

            {/* Roles */}
            <div className="flex flex-wrap gap-2">
              <Target size="md" position="center" variant="primary" value="Doctor" />
              <Target size="md" position="center" variant="primary" value="Cliente" />
            </div>
          </div>
        </section>

        {/* Información del perfil */}
        <section className="rounded-2xl bg-white p-6"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-8">

            {/* Columna 1: Datos personales */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                Datos personales
              </h3>
              <Description value={data.name} description="Nombre"/>
              <Description value={data.lastName} description="Apellido"/>
              <Description value={data.cardId} description="Cedula"/>
            </div>

            {/* Separador vertical */}
            <div className="hidden md:flex items-center justify-center">
              <div className="w-px h-full" style={{ background: 'linear-gradient(var(--hr-gradient))' }}></div>
              <TbMedicalCrossFilled className="absolute" style={{ color: 'var(--color-400)' }}/>
            </div>

            {/* Columna 2: Datos de cuenta */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                Cuenta
              </h3>
              <Description value={data.password} description="Contraseña"/>
              <Description value={data.email} description="Correo Electronico"/>
              <Description value={data.departament} description="Cargo"/>
            </div>
          </div>

          {/* Separador horizontal */}
          <div className="h-px w-full my-6" style={{ background: 'linear-gradient(var(--hr-gradient))' }}></div>

          {/* Departamento */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              Departamentos
            </h3>
            <div className="flex flex-wrap gap-3">
              <Description value="Departamento" description="Departamento"/>
              <Description value="Departamento" description="Departamento"/>
            </div>
          </div>
        </section>
      </section>
        )
      }
    </div>
  );
}
