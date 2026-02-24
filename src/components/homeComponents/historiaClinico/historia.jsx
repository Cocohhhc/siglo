//Icons
import { CgProfile } from "react-icons/cg";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

//Componentes
import Button from "@/src/components/ui/button/button";


export default function HistoriaClinico({ onClick, paciente }) {

  const decline = <FaTrash />;
  
  const fields = [
    { icon: <MdDriveFileRenameOutline />, label: paciente.name == "" ? "Nombre" : paciente.name },
    { icon: <MdDriveFileRenameOutline />, label: paciente.lastName == "" ? "Apellido" : paciente.lastName },
    { icon: <FaRegAddressCard />, label: paciente.IdNumber == "" ? "Cédula" : paciente.IdNumber },
    { icon: <BsCalendar2Date />, label: paciente.date_of_birth == "" ? "Fecha de nacimiento" : paciente.date_of_birth },
    { icon: <BsCalendar2Date />, label: paciente.age == "" ? "Edad" : paciente.age },
  ];
  

  return (
    <section>
      <div className="flex flex-col mb-4">
        <h1 className="text-xl font-bold" style={{ color: 'var(--color-900)' }}>Ficha</h1>
        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Visualiza la ficha del paciente</p>
      </div>

      <div className="rounded-2xl bg-white p-5"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <div className="flex items-center justify-between gap-4 max-md:flex-col">
          
          {/* Perfil + campos */}
          <div className="flex items-center gap-6 flex-wrap">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--color-200), var(--color-300))' }}
            >
              <CgProfile className="text-3xl" style={{ color: 'var(--color-700)' }} />
            </div>

            {/* Campos */}
            <div className="flex flex-wrap items-center gap-3">
              {fields.map((field, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: 'var(--color-50)', color: 'var(--color-800)' }}
                >
                  <span className="text-sm" style={{ color: 'var(--color-500)' }}>{field.icon}</span>
                  <span className="text-sm font-medium">{field.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Acción */}
          <div className="shrink-0 max-md:w-full">
            <Button width="full" size="sm" variant="decline" value={decline} onClick={() => {onClick()}} />
          </div>
        </div>
      </div>
    </section>
  );
}
