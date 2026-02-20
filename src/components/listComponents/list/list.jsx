//Icons
import { CgProfile } from "react-icons/cg";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";

//Componentes
import Button from "@/src/components/ui/button/button";

export default function List({
    info,
    buttonUpdate,
    buttonCreate,
}) {

  const fields = [
    { icon: <MdDriveFileRenameOutline />, label: "Nombre", value: info.name },
    { icon: <MdDriveFileRenameOutline />, label: "Apellido", value: info.lastName },
    { icon: <FaRegAddressCard />, label: "Cédula", value: info.idNumber },
    { icon: <BsCalendar2Date />, label: "Fecha de nacimiento", value: info.fechaDeNacimiento },
    { icon: <BsCalendar2Date />, label: "Edad", value: info.edad },
  ];

  return (
    <section>
      <div className="rounded-2xl bg-white p-5"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <div className= "flex flex-col gap-4 max-md:flex-col">
          
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
                  <span className="text-sm font-medium">{field.label}:</span>
                  <span className="text-sm">{field.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-2 max-md:w-full">
            <Button width="md" size="sm" variant="primary" value="Actualizar" onClick={buttonUpdate} />
            <Button width="md" size="sm" variant="primary" value="Crear Registro" onClick={() => buttonCreate(info.id)} />
          </div>
        </div>
      </div>
    </section>
  );
}