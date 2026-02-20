'use client';

// Imports
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePageName } from "@/src/hook/usePageName";
import { 
    entregaAceptarAction, 
    entregaRechazarAction, 
    entregaByIdAction 
} from "@/src/actions/entrega.page.actions";

// Components
import RegistroClinico from "@/src/components/ui/lista/registroClinico";
import GridEntrega from "@/src/components/entregaComponents/grid/grid";
import SelectEntrega from "@/src/components/entregaComponents/selectEntrega/select";
import InputLogin from "@/src/components/ui/inputs/inputs";
import NotFound from "@/src/components/ui/notFound/notFound";

export default function EntregaClient({ 
    entrega, 
    variableEntregaEnviadas, 
    variableEntregaAceptadas, 
    variableEntregaRechazadas 
}) {

    const router = useRouter();
    const pathName = usePageName();

    // Tab activo
    const [activeTab, setActiveTab] = useState('recibidas');

    // Estado único con todas las categorías
    const [data, setData] = useState({
        recibidas: entrega || [],
        enviadas: variableEntregaEnviadas || [],
        aceptadas: variableEntregaAceptadas || [],
        rechazadas: variableEntregaRechazadas || [],
    });

    const [loading, setLoading] = useState(false);

    // Sincronizar cuando cambien props del server
    useEffect(() => {
        setData({
            recibidas: entrega || [],
            enviadas: variableEntregaEnviadas || [],
            aceptadas: variableEntregaAceptadas || [],
            rechazadas: variableEntregaRechazadas || [],
        });
    }, [entrega, variableEntregaEnviadas, variableEntregaAceptadas, variableEntregaRechazadas]);

    // Datos activos según tab
    const activeData = data[activeTab] || [];

    // Aceptar entrega
    const aceptar = async (id) => {
        try {
            await entregaAceptarAction(id);
            router.refresh(); // vuelve a traer datos del server
        } catch (error) {
            console.log(error);
        }
    };

    // Rechazar entrega
    const rechazar = async (id) => {
        try {
            await entregaRechazarAction(id);
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    // Buscar entrega por id
    const onSearch = async (id) => {
        if (!id) return;

        try {
            setLoading(true);
            const result = await entregaByIdAction(id);

            setData((prev) => ({
                ...prev,
                recibidas: Array.isArray(result) ? result : [result],
            }));

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <section>
                <RegistroClinico value={pathName} />
            </section>

            {loading ? (
                <section>
                    <p className="text-center text-2xl font-bold text-zinc-600">
                        Cargando...
                    </p>
                </section>
            ) : (
                <section>

                    <section>
                        <SelectEntrega 
                            activeTab={activeTab} 
                            setActiveTab={setActiveTab} 
                        />

                        <article>
                            <InputLogin 
                                onChange={(e) => onSearch(e.target.value)} 
                                type="text" 
                                placeholder="Buscar"
                            />
                        </article>
                    </section>

                    {activeData.length === 0 ? (
                        <section>
                            <NotFound message="No se encontraron entregas" />
                        </section>
                    ) : (
                        <article className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
                            {activeData.map((item) => (
                                <GridEntrega 
                                    key={item.id} 
                                    info={item} 
                                    aceptar={aceptar} 
                                    rechazar={rechazar}
                                />
                            ))}
                        </article>
                    )}

                </section>
            )}
        </main>
    );
}