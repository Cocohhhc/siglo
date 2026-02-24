'use client'
//Imports
import { useState, useEffect } from "react";

//Components
import Account from "@/src/components/perfilComponents/account/account"
import RegistroClinico from "@/src/components/ui/lista/registroClinico"
import SelectEntregaPerfil from "@/src/components/entregaComponents/selectEntrega/selectEntregaPerfil"
import NotFound from "@/src/components/ui/error/notFound"
import GridEntrega from "@/src/components/entregaComponents/grid/grid"

export default function PageList({ entregaEnviadas, entregaAceptadas }) {
    const [activeTab, setActiveTab] = useState('enviadas');
    
    const [data, setData] = useState({
        enviadas: entregaEnviadas || [],
        aceptadas: entregaAceptadas || [],
    });
    // Sincronizar cuando cambien props del server
    useEffect(() => {
        setData({
            enviadas: entregaEnviadas || [],
            aceptadas: entregaAceptadas || [],
        });
    }, [entregaEnviadas, entregaAceptadas]);

    // Datos activos según tab
    const activeData = data[activeTab] || [];

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
                    <div className="card h-full bg-white">

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
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar">      
                                    {activeData.map((item) => (
                                        <GridEntrega 
                                            key={item.id} 
                                            info={item} 
                                            variant="minimal"
                                            size="sm"
                                            width="full"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Premium Subscription - Right side tile */}
                <div>
                    <div className="card h-full bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-bold mb-4">Premium+</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-300">✓</span>
                                    <span>1 mes gratis</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-300">✓</span>
                                    <span>Acceso ilimitado</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-300">✓</span>
                                    <span>Soporte prioritario</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-300">✓</span>
                                    <span>Descuentos exclusivos</span>
                                </li>
                            </ul>
                        </div>
                        <button className="mt-6 w-full bg-white text-purple-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
                            Suscribirse
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}