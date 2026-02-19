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

    const [info, setInfo] = useState([]);
    const [infoEnviadas, setInfoEnviadas] = useState([]); 
    const [infoAceptadas, setInfoAceptadas] = useState([]);
    const [infoRechazadas, setInfoRechazadas] = useState([]);

    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);

    // Tab activo: 'recibidas' (no aceptadas) por defecto
    const [activeTab, setActiveTab] = useState('recibidas');

    const { entregaList, entregaEnviadas, entregaAceptadas, entregaRechazadas, entregaById, entregaAceptar, entregaRechazar } = entregaServices();
    
    // Trae todas las entregas al montar y cuando se actualiza
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await entregaList("1");
                const resultEnviadas = await entregaEnviadas("1");
                const resultAceptadas = await entregaAceptadas("1");
                const resultRechazadas = await entregaRechazadas("1");
                setInfo(result);
                setInfoEnviadas(resultEnviadas);
                setInfoAceptadas(resultAceptadas);
                setInfoRechazadas(resultRechazadas);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };

        fetchData();
    }, [update]);

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

    // Obtener los datos según el tab activo
    const getActiveData = () => {
        switch (activeTab) {
            case 'recibidas':
                return info;
            case 'enviadas':
                return infoEnviadas;
            case 'aceptadas':
                return infoAceptadas;
            case 'rechazadas':
                return infoRechazadas;
            default:
                return info;
        }
    };

    const activeData = getActiveData();

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
                                    <Button 
                                        value="Entregas recibidas" 
                                        variant={activeTab === 'recibidas' ? 'primary' : 'history'} 
                                        size="sm" 
                                        onClick={() => setActiveTab('recibidas')}
                                    />
                                    <Button 
                                        value="Entregas enviadas" 
                                        variant={activeTab === 'enviadas' ? 'primary' : 'history'} 
                                        size="sm" 
                                        onClick={() => setActiveTab('enviadas')}
                                    />
                                    <Button 
                                        value="Entregas aceptadas" 
                                        variant={activeTab === 'aceptadas' ? 'primary' : 'history'} 
                                        size="sm" 
                                        onClick={() => setActiveTab('aceptadas')}
                                    />
                                    <Button 
                                        value="Entregas rechazadas" 
                                        variant={activeTab === 'rechazadas' ? 'primary' : 'history'} 
                                        size="sm" 
                                        onClick={() => setActiveTab('rechazadas')}
                                    />
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
                            activeData.length === 0 ? (
                              <section className="">
                                    <NotFound message="No se encontraron entregas"/>
                                </section>
                            ) : (
                            <article className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
                                {
                                    activeData.map((item) => (
                                        <GridEntrega key={item.id} info={item} aceptar={aceptar} rechazar={rechazar}/>
                                    ))
                                }
                            </article>
                            )
                        }
                    </section>
                )
            }
        </main>
    )
}