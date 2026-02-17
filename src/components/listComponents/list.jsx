import { FaUser } from "react-icons/fa";
import Button from "@/src/components/ui/button/button";

export default function List({
    info,
    buttonUpdate,
    buttonCreate,
}) {
    return (
        <section className="
        flex flex-row flex-wrap px-6  text-[1.1rem] font-normal
        items-center gap-x-5 rounded-lg card">
            <article className="flex flex-row items-center justify-center  gap-x-5">
                <div className="flex justify-center items-center w-10 h-10 bg-(--color-600) rounded-full">
                    <FaUser className="text-(--color-50)"/>
                </div>
                <div className="flex flex-col">
                    <p className="text-(length:--p) text-(--text-primary)">Nombre:</p>
                    <p>{info.name}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-(length:--p) text-(--text-primary)">Apellido:</p>
                    <p>{info.lastName}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-(length:--p) text-(--text-primary)">Edad:</p>
                    <p>{info.edad}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-(length:--p) text-(--text-primary)">Fecha de Nacimiento:</p>
                    <p>{info.fechaDeNacimiento}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-(length:--p) text-(--text-primary)">Cedula:</p>
                    <p>{info.idNumber}</p>
                </div>

                <div className="">
                    <Button
                        variant="primary"
                        size="sm"
                        value="Actualizar"
                        onClick={buttonUpdate}
                    />
                </div>
                <div className="">
                    <Button
                        variant="primary"
                        size="sm"
                        value="Crear Registro"
                        onClick={() => buttonCreate(info.id)}
                    />
                </div>
            </article>
        </section>
    );
}