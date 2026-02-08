import Target from "@/src/components/ui/target/target";
import Button from "@/src/components/ui/button/button";

export default function GridEntrega({
    info,
    showModal,
    aceptar,
    rechazar
}) {
    return (
        <section key={info.id} className="w-full card flex flex-col gap-4 p-4">
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

            <article className="grid grid-cols-2 gap-4">
                <div className="">
                    <h1>Paciente</h1>
                    <Button value="Ver datos" variant="history" onClick={showModal}/>
                </div>

                <div className="">
                    <h1>Estado</h1>
                    <p>{info.estado}</p>
                </div>
            </article>

            <article className="flex items-center justify-center w-full">
                <Button onClick={() => aceptar(info.id)} value="Aceptar" variant="primary" size="sm" width="full"/>
            </article>
        </section>
    )
}