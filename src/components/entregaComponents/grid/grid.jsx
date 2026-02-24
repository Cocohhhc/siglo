'use client';
import { useState } from "react";
import clsx from "clsx";
import Target from "@/src/components/ui/target/target";
import ModalPacient from "@/src/components/entregaComponents/pacientModal/modal";
import Button from "@/src/components/ui/button/button";

export default function GridEntrega({
    info,
    aceptar,
    rechazar,
    variant = "standard",
    size = "md",
    width = "full"
}) {
    const [showModal, setShowModal] = useState(false);

    const variants = {
        standard: "bg-white shadow-sm border border-gray-100",
        minimal: "bg-gray-50 border border-gray-200 shadow-none hover:bg-white hover:shadow-md",
    };

    const sizes = {
        sm: "p-3",
        md: "p-5",
        lg: "p-8",
    };

    const widths = {
        auto: "w-auto",
        full: "w-full",
    };

    return (
        <section className={clsx(
            "relative flex flex-col rounded-3xl transition-all duration-300",
            variants[variant],
            widths[width],
            variant === "standard" && "hover:shadow-xl hover:-translate-y-1",
            showModal ? "z-50" : "z-10"
        )}>
            {/* Header - Barra de estado minimalista */}
            <div className={clsx(
                "px-6 py-3 flex items-center justify-between rounded-t-3xl",
                variant === "standard" ? "bg-linear-to-r from-(--color-500) to-(--color-600)" : "bg-gray-100 border-b border-gray-200"
            )}>
                <span className={clsx(
                    "text-[10px] font-bold tracking-[0.1em] uppercase",
                    variant === "standard" ? "text-white" : "text-gray-500"
                )}>
                    Operación #{info.id || '---'}
                </span>
                <div className={clsx(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs",
                    info.estado === 'pendiente' ? "bg-yellow-100 text-yellow-700 border border-yellow-200" :
                    info.estado === 'aceptadas' ? "bg-green-100 text-green-700 border border-green-200" :
                    "bg-blue-100 text-blue-700 border border-blue-200"
                )}>
                    {info.estado}
                </div>
            </div>

            {/* Contenido principal */}
            <div className={clsx("flex flex-col gap-6", sizes[size])}>
                
                {/* Flujo: Emisor -> Receptor */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1.5 flex-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
                            Emisor
                        </span>
                        <Target variant="secondary" position="center" value={info.emisor.name} size="sm" className="!rounded-xl" />
                    </div>

                    <div className="flex items-center justify-center pt-4 opacity-30">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6"/>
                        </svg>
                    </div>

                    <div className="flex flex-col gap-1.5 flex-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 text-right">
                            Receptor
                        </span>
                        <Target variant="secondary" position="center" value={info.receptor.name} size="sm" className="!rounded-xl" />
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
                            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white border border-(--color-200) animate-in fade-in slide-in-from-top-2 duration-200">
                                <ModalPacient info={info}/>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer de acciones (solo si es pendiente o estándar) */}
                {variant === "standard" && (
                    <div className="flex gap-3 pt-4 border-t border-gray-50">
                        <Button 
                            onClick={() => aceptar?.(info.id)} 
                            value="Confirmar" 
                            variant="accept" 
                            size="sm" 
                            width="full"
                            className="!rounded-2xl shadow-sm hover:shadow-md active:scale-95"
                        />
                        <Button 
                            onClick={() => rechazar?.(info.id)} 
                            value="Rechazar" 
                            variant="decline" 
                            size="sm" 
                            width="full"
                            className="!rounded-2xl shadow-sm hover:shadow-md active:scale-95"
                        />
                    </div>
                )}
            </div>
        </section> 
    );
}