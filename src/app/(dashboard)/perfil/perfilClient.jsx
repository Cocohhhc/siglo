'use client'
//Imports
import { useState, useEffect } from "react";

//Components
import Account from "@/src/components/perfilComponents/account/account"
import RegistroClinico from "@/src/components/ui/lista/registroClinico"
import SelectEntregaPerfil from "@/src/components/entregaComponents/selectEntrega/selectEntregaPerfil"
import NotFound from "@/src/components/ui/error/notFound"
import GridEntrega from "@/src/components/ui/grid/grid"
import EntregaPieChart from "@/src/components/perfilComponents/charts/EntregaPieChart"
import Pagination from "@/src/components/ui/pagination/pagination"

export default function PerfilClient({ entregaEnviadas, entregaAceptadas, entregaRechazadas }) {
    const [activeTab, setActiveTab] = useState('enviadas');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [data, setData] = useState({
        enviadas: entregaEnviadas || [],
        aceptadas: entregaAceptadas || [],
        rechazadas: entregaRechazadas || [],
    });
    // Sincronizar cuando cambien props del server
    useEffect(() => {
        setData({
            enviadas: entregaEnviadas || [],
            aceptadas: entregaAceptadas || [],
            rechazadas: entregaRechazadas || [],
        });
    }, [entregaEnviadas, entregaAceptadas, entregaRechazadas]);
    
    // Resetear página cuando cambie tab
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    // Datos activos según tab
    const activeData = data[activeTab] || [];
    
    // Paginación
    const paginatedData = activeData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <main className="w-full px-4 py-6">
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-max">
                {/* Profile Card - Full width */}                        
                <div className="col-span-1 lg:col-span-3">
                    <RegistroClinico value={"Perfil"} />
                </div>

                <div className="lg:col-span-2 lg:row-span-2">
                    <div className="card h-full">
                        <Account />
                    </div>
                </div>

                {/* Payment Data - Smaller tile on the right */}
                <div>
                    <div className="card h-full bg-white overflow-hidden">
                        <EntregaPieChart 
                            counts={{
                                enviadas: data.enviadas.length,
                                aceptadas: data.aceptadas.length,
                                rechazadas: data.rechazadas.length
                            }} 
                        />
                    </div>
                </div>

                {/* Entregas Section - Spanning full width or 2 columns */}
                <div className="lg:col-span-2">
                    <div className="card h-full bg-white">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Mis Entregas</h3>
                            <SelectEntregaPerfil activeTab={activeTab} setActiveTab={setActiveTab} />
                            
                            {activeData.length === 0 ? (
                                <div className="py-12 flex justify-center">
                                    <NotFound message="No se encontraron entregas" />
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">      
                                        {paginatedData.map((item) => (
                                            <GridEntrega 
                                                key={item.id} 
                                                info={item} 
                                                variant="minimal"
                                                size="sm"
                                                width="full"
                                            />
                                        ))}
                                    </div>
                                    <Pagination 
                                        totalItems={activeData.length}
                                        itemsPerPage={itemsPerPage}
                                        currentPage={currentPage}
                                        onPageChange={setCurrentPage}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}