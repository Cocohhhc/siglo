'use client';
//Imports
import { useState, useEffect } from "react";
import { usePageName } from "@/src/hook/usePageName";
import { entregaServices }from "@/src/services/entrega.services";

//Components
import RegistroClinico from "@/src/components/ui/lista/registroClinico";
import GridEntrega from "@/src/components/entregaComponents/grid/grid";
import Button from "@/src/components/ui/button/button";
import ModalPacient from "@/src/components/entregaComponents/pacientModal/modal";

export default function Entrega() {
    const pathName = usePageName();

    const [info, setInfo] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);

    const { entregaList, entregaAceptar, entregaRechazar } = entregaServices();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await entregaList("1");
                setInfo(result);
                setOriginalData(result);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const showModal = () => {
        setModal(!modal);
    }

    const aceptar = async (id) => {
        await entregaAceptar(id);
        setUpdate(!update);
    }

    const rechazar = async (id) => {
        await entregaRechazar(id);
        setUpdate(!update);
    }

    return (
        <main>
            <section className="">
                <RegistroClinico value={pathName} />
            </section>

            <section>
                <article>
                    <h1 className="text-(length:--h1)">Hacer nueva entrega</h1>
                    <Button s value="Hacer nueva entrega" variant="primary" size="sm" />
                </article>
            </section>

            <section className="grid grid-cols-3 gap-4 mt-4">
                <article className="">
                    {info.map((item) => (
                        <GridEntrega key={item.id} info={item} showModal={showModal} aceptar={aceptar} rechazar={rechazar}/>
                    ))}
                </article>
            </section>

            {modal && (
                <div className="
                    flex flex-col items-center justify-center w-[50vw] h-[80vh] 
                    gap-4 absolute  left-[25%] transform -translate-x-1/2 
                    -translate-y-1/2 z-50
                " onClick={showModal}>
                    <div className="relative">
                        {info.map((item) => (
                            <ModalPacient key={item.id} info={item}/>
                        ))}
                    </div>
                </div>
            )}

        </main>
    )
}