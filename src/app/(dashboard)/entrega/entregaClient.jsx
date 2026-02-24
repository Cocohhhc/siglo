'use client';

// Imports
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
    entregaAceptarAction, 
    entregaRechazarAction, 
    entregaByIdAction 
} from "@/src/actions/entrega.page.actions";

// Components
import RegistroClinico from "@/src/components/ui/lista/registroClinico";
import GridEntrega from "@/src/components/ui/grid/grid";
import SelectEntrega from "@/src/components/entregaComponents/selectEntrega/select";
import InputLogin from "@/src/components/ui/inputs/inputs";
import NotFound from "@/src/components/ui/error/notFound";
import Pagination from "@/src/components/ui/pagination/pagination";

export default function EntregaClient({ 
    entrega, 
    entregaEnviadas, 
    entregaAceptadas, 
    entregaRechazadas 
}) {

    const router = useRouter();

    // Tab activo
    const [activeTab, setActiveTab] = useState('recibidas');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;


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
    
    // Resetear página cuando cambie tab o filtro
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, filterText]);

    // Datos activos según tab
    const activeData = data[activeTab] || [];
    
    // Paginación para datos activos
    const paginatedActiveData = activeData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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

    // Paginación para búsqueda
    const paginatedSearchData = onSearch.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    
    return (
        <main>
            <section>
                <RegistroClinico value={"Entrega"} />
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
                                   <>
                                       <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 col-span-full">
                                           {paginatedSearchData.map((item) => (
                                                <GridEntrega 
                                                    key={item.id} 
                                                    info={item} 
                                                    aceptar={aceptar} 
                                                    rechazar={rechazar}
                                                    variant={"standard"}
                                                />
                                           ))}
                                       </div>
                                       <div className="col-span-full">
                                            <Pagination 
                                                totalItems={onSearch.length}
                                                itemsPerPage={itemsPerPage}
                                                currentPage={currentPage}
                                                onPageChange={setCurrentPage}
                                            />
                                       </div>
                                   </>
                               ) : (
                                   <NotFound message="No se encontraron entregas para esta búsqueda" />
                               )
                           ) : (
                               activeData.length > 0 ? (
                                   <>
                                       <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 col-span-full">
                                           {paginatedActiveData.map((item) => (
                                                <GridEntrega 
                                                    key={item.id} 
                                                    info={item} 
                                                    aceptar={aceptar} 
                                                    rechazar={rechazar}
                                                    variant={"standard"}
                                                />
                                           ))}
                                       </div>
                                       <div className="col-span-full">
                                            <Pagination 
                                                totalItems={activeData.length}
                                                itemsPerPage={itemsPerPage}
                                                currentPage={currentPage}
                                                onPageChange={setCurrentPage}
                                            />
                                       </div>
                                   </>
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