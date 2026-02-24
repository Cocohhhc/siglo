'use client';

// Imports
import { useState, useEffect, useMemo } from "react";
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
import NotFound from "@/src/components/ui/error/notFound";

export default function EntregaClient({ 
    entrega, 
    entregaEnviadas, 
    entregaAceptadas, 
    entregaRechazadas 
}) {

    const router = useRouter();
    const pathName = usePageName();

    // Tab activo
    const [activeTab, setActiveTab] = useState('recibidas');

    // Estado único con todas las categorías
    const [data, setData] = useState({
        recibidas: entrega || [],
        enviadas: entregaEnviadas || [],
        aceptadas: entregaAceptadas || [],
        rechazadas: entregaRechazadas || [],
    });

    const [loading, setLoading] = useState(false);

    const [filterText, setFilterText] = useState("");


    // Sincronizar cuando cambien props del server
    useEffect(() => {
        setData({
            recibidas: entrega || [],
            enviadas: entregaEnviadas || [],
            aceptadas: entregaAceptadas || [],
            rechazadas: entregaRechazadas || [],
        });
    }, [entrega, entregaEnviadas, entregaAceptadas, entregaRechazadas]);

    // Datos activos según tab
    const activeData = data[activeTab] || [];

    // Aceptar entrega
    const aceptar = async (id) => {
        try {
            const res = await entregaAceptarAction(id);
            if(res.ok){
                router.refresh(); // vuelve a traer datos del server
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Rechazar entrega
    const rechazar = async (id) => {
        try {
            const res = await entregaRechazarAction(id);
            if(res.ok){
                router.refresh();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Buscard entregas por cedula del paciente
    const onSearch = useMemo(() => {
        if (!filterText) return entrega;
        return entrega.filter((p) => String(p.pacientes.idNumber ?? "").includes(filterText));
    }, [entrega, filterText]);
    
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

                        <article className="mt-4">
                            <p >Busca las entregas por la cedula del paciente</p>
                            <InputLogin 
                                onChange={(e) => setFilterText(e.target.value)} 
                                type="text"
                                value={filterText} 
                                placeholder="Ingrese la cedula del paciente"
                            />
                        </article>
                    </section>

                        <article className={
                            (filterText.length > 0 && onSearch.length > 0) || (filterText.length === 0 && activeData.length > 0)
                                ? "grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3"
                                : "mt-4"
                        }>
                           { 
                           filterText.length > 0 ? (
                               onSearch.length > 0 ? (
                                   onSearch.map((item) => (
                                        <GridEntrega 
                                            key={item.id} 
                                            info={item} 
                                            aceptar={aceptar} 
                                            rechazar={rechazar}
                                            variant={"standard"}
                                        />
                                   ))
                               ) : (
                                   <NotFound message="No se encontraron entregas para esta búsqueda" />
                               )
                           ) : (
                               activeData.length > 0 ? (
                                   activeData.map((item) => (
                                        <GridEntrega 
                                            key={item.id} 
                                            info={item} 
                                            aceptar={aceptar} 
                                            rechazar={rechazar}
                                            variant={"standard"}
                                        />
                                   ))
                               ) : (
                                   <NotFound message={`No hay entregas ${activeTab} disponibles`} />
                               )
                           )}
                        </article>

                </section>
            )}
        </main>
    );
}