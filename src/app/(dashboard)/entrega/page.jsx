'use client';
//Imports
import { useState, useEffect } from "react";
import { usePageName } from "@/src/hook/usePageName";
import { entregaServices }from "@/src/services/entrega.services";

//Components
import RegistroClinico from "@/src/components/ui/lista/registroClinico";
import GridEntrega from "@/src/components/entregaComponents/grid/grid";
import Button from "@/src/components/ui/button/button";
import InputLogin from "@/src/components/ui/inputs/inputs";
import NotFound from "@/src/components/ui/notFound/notFound";

export default function Entrega() {
    const pathName = usePageName();

    const [info, setInfo] = useState([] || {});
    const [infoEnviadas, setInfoEnviadas] = useState([] || {}); 
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [enviadas, setEnviadas] = useState(false);

    const { entregaList, entregaEnviadas, entregaAceptar, entregaRechazar, entregaById } = entregaServices();
    
    // Trae todas las entregas
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await entregaList("4");
                const resultEnviadas = await entregaEnviadas("3");
                setInfo(result);
                setInfoEnviadas(resultEnviadas);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };

        fetchData();
    }, []);

    // Aceptar entrega
    const aceptar = async (id) => {
        console.log("EN el aceptar", id);
        await entregaAceptar(id);
        setUpdate(!update);
    }

    // Rechazar entrega
    const rechazar = async (id) => {
        console.log("EN el rechazar", id);
        await entregaRechazar(id);
        setUpdate(!update);
    }

    const onSearch = async (id) => {
        if(id.length === 0) return;
        const result = await entregaById(id);

        setInfo(result);
        setLoading(false);
    }
    return (
        <main>
            <section className="">
                <RegistroClinico value={pathName} />
            </section>

             {
                loading ? (
                    <section>
                        <p className="text-center text-2xl font-bold text-zinc-600">No hay datos</p>
                    </section>
                ) : (
                    <section>

                        <section>
                            <article className="">
                                <div className="">
                                    <h1 className="text-(length:--h1)">Hacer nueva entrega</h1>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Button value="Hacer nueva entrega" variant="primary" size="sm" />
                                    {
                                        enviadas ? (
                                            <Button value="Entregas recibidas" variant="history" size="sm" onClick={() => {setEnviadas(false)}}/>
                                        ) : (
                                            <Button value="Entregas enviadas" variant="history" size="sm" onClick={() => {setEnviadas(true)}}/>
                                        )
                                    }
                                </div>
                            </article>

                            <article>
                                <InputLogin 
                                onChange={(e) => onSearch(e.target.value)} 
                                type="text" 
                                placeholder="Buscar"
                                />
                            </article>
                        </section>

                        {
                            enviadas ? (
                                <section>
                                    <article className="grid grid-cols-3 gap-4 mt-4">
                                        {infoEnviadas.length === 0 ? (
                                            <div className="col-span-3">
                                                <NotFound message="Este usuario no tiene entregas enviadas"/>
                                            </div>
                                        ) : (
                                            infoEnviadas.map((item) => (
                                                <GridEntrega key={item.id} info={item} aceptar={aceptar} rechazar={rechazar}/>
                                            ))
                                        )}
                                    </article>
                                </section>

                            ) : info.length === 0 ? (
                              <section className="">
                                    <NotFound message="No se encontraron entregas"/>
                                </section>
                            ) : (
                            <article className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
                                {info.map((item) => (
                                    <GridEntrega key={item.id} info={item} aceptar={aceptar} rechazar={rechazar}/>
                                ))}
                            </article>
                            )
                        }
                    </section>
                )
            }
        </main>
    )
}