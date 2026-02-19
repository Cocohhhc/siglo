'use client';
import { useState } from "react";
import Target from "@/src/components/ui/target/target";
import ModalPacient from "@/src/components/entregaComponents/pacientModal/modal";
import Button from "@/src/components/ui/button/button";

export default function GridEntrega({
    info,
    aceptar,
    rechazar
}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <section className="relative w-full rounded-2xl bg-white transition-all duration-300 hover:shadow-lg"
            style={{ boxShadow: 'var(--shadow-card)' }}
        >
            {/* Estado - barra superior sutil */}
            <div className="px-5 py-2 flex items-center justify-between"
                style={{ background: 'linear-gradient(135deg, var(--color-500), var(--color-600))' }}
            >
                <span className="text-xs font-semibold text-white tracking-wide uppercase">
                    Entrega
                </span>
                <span className="text-xs px-3 py-0.5 rounded-full bg-white/20 text-white font-medium">
                    {info.estado}
                </span>
            </div>

            {/* Contenido principal */}
            <div className="px-5 py-4 flex flex-col gap-4">

                {/* Emisor y Receptor */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium uppercase tracking-wider"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Emisor
                        </span>
                        <Target variant="secondary" position="center" value={info.emisor.name} size="sm"/>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium uppercase tracking-wider"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Receptor
                        </span>
                        <Target variant="secondary" position="center" value={info.receptor.name} size="sm"/>
                    </div>
                </div>

                {/* Ver datos del paciente */}
                <div className="relative">
                    <Button 
                        value={showModal ? "Ocultar datos" : "Ver datos del paciente"} 
                        variant="history" 
                        size="sm" 
                        width="full"
                        onClick={() => setShowModal(!showModal)}
                    />

                    {/* Modal paciente - overlay absoluto, no afecta el layout */}
                    {showModal && (
                        <div className="absolute left-0 right-0 top-full mt-2 z-50">
                            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white border" style={{ borderColor: 'var(--color-200)' }}>
                                <ModalPacient info={info}/>
                            </div>
                        </div>
                    )}
                </div>

                {/* Separador */}
                <div className="w-full h-px"
                    style={{ background: 'linear-gradient(var(--hr-gradient))' }}
                />

                {/* Acciones */}
                <div className="flex gap-3">
                    <Button 
                        onClick={() => aceptar(info.id)} 
                        value="Aceptar" 
                        variant="accept" 
                        size="sm" 
                        width="full"
                    />
                    <Button 
                        onClick={() => rechazar(info.id)} 
                        value="Rechazar" 
                        variant="decline" 
                        size="sm" 
                        width="full"
                    />
                </div>
            </div>
        </section> 
    )
}