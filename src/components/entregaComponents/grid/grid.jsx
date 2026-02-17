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
    console.log(info)
    return (
        <section key={info.id} className="relative w-full card flex flex-col gap-4 p-4">
            <article className="grid grid-cols-2 gap-4">
                <div className="">
                    <h1>Emisor</h1>
                    <Target variant="secondary" position="center" value={info.emisor.name} size="md"/>
                </div>

                <div className="w-full">
                    <h1>Receptor</h1>
                    <Target variant="secondary" position="center" value={info.receptor.name} size="md"/>
                </div>
            </article>                    
            <Button className="peer absolute top-[55%] left-[12%] z-20" size="sm" width="lg" value="Ver datos" variant="history"/>

            <article className="flex gap-4">
                <div className="text-2xl text-center w-full flex flex-col">
                    <h1>Estado {info.estado}</h1>
                </div>
            </article>

            <article className="flex gap-4 items-center justify-center w-full mt-12 peer-hover:opacity-0 transition-opacity duration-500 ease-in-out">
                <Button onClick={() => aceptar(info.id)} value="Aceptar" variant="primary" size="sm" width="full"/>

                <Button onClick={() => rechazar(info.id)} value="Rechazar" variant="decline" size="sm" width="full"/>
            </article>

        <div className="absolute pointer-events-none top-[49%] left-0 z-10 opacity-0 peer-hover:opacity-100 transition-opacity duration-500 ease-in-out">
            <ModalPacient info={info}/>
        </div>
        </section> 
    )
}