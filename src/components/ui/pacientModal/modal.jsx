import Description from "@/src/components/ui/doctorDescription/description";
import Target from "@/src/components/ui/target/target";
import { TbUserCircle } from "react-icons/tb";

export default function ModalPacient({ info }) {
    if (!info || !info.pacientes) return null;

    return (
        <section className="p-6 bg-white flex flex-col gap-6">
            {/* Header del Modal Interno */}
            <header className="flex items-center gap-3 border-b border-gray-50 pb-4">
                <div className="p-2 bg-blue-50 rounded-xl">
                    <TbUserCircle className="text-xl text-blue-500" />
                </div>
                <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-gray-900 leading-none">
                        Datos del Paciente
                    </h4>
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-1">
                        Información Detallada
                    </span>
                </div>
            </header>

            {/* Grid de Información */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                {/* Columna 1: Identidad */}
                <div className="flex flex-col gap-4">
                    <Target size="sm" variant="primary" value="Identidad" className="!w-fit !py-0.5 !px-2 opacity-80" />
                    <div className="flex flex-col gap-3">
                        <Description value={info.pacientes.name} description="Nombre" variant="standard" size="sm" />
                        <Description value={info.pacientes.lastName} description="Apellido" variant="standard" size="sm" />
                        <Description value={info.pacientes.idNumber} description="Cédula" variant="standard" size="sm" />
                    </div>
                </div>

                {/* Columna 2: Datos Adicionales */}
                <div className="flex flex-col gap-4">
                    <Target size="sm" variant="primary" value="Otros Datos" className="!w-fit !py-0.5 !px-2 opacity-80" />
                    <div className="flex flex-col gap-3">
                        <Description 
                            value={info.pacientes.fechaDeNacimiento} 
                            description="Nacimiento" 
                            variant="standard" 
                            size="sm" 
                        />
                        <Description 
                            value={`${info.pacientes.edad} años`} 
                            description="Edad" 
                            variant="standard" 
                            size="sm" 
                        />
                    </div>
                </div>

            </article>
        </section>
    );
}