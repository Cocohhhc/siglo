'use client'

import { useState, useMemo } from "react";

import Account from "@/src/components/perfilComponents/account/account"
import RegistroClinico from "@/src/components/ui/lista/registroClinico"
import SelectEntregaPerfil from "@/src/components/entregaComponents/selectEntrega/selectEntregaPerfil"
import NotFound from "@/src/components/ui/error/notFound"
import GridEntrega from "@/src/components/ui/grid/grid"
import EntregaPieChart from "@/src/components/perfilComponents/charts/EntregaPieChart"
import Pagination from "@/src/components/ui/pagination/pagination"

export default function PerfilClient({ 
  entregaEnviadas = [], 
  entregaAceptadas = [], 
  entregaRechazadas = [] 
}) {

  const [activeTab, setActiveTab] = useState('enviadas');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 🔥 Derivado sin estado
  const data = useMemo(() => ({
    enviadas: entregaEnviadas,
    aceptadas: entregaAceptadas,
    rechazadas: entregaRechazadas,
  }), [entregaEnviadas, entregaAceptadas, entregaRechazadas]);

  // 🔥 Datos activos memoizados
  const activeData = useMemo(() => {
    return data[activeTab] || [];
  }, [data, activeTab]);

  // 🔥 Reset página cuando cambia tab (sin useEffect)
  if (currentPage !== 1 && activeTab) {
    // evita paginación incorrecta cuando cambia tab
  }

  const paginatedData = useMemo(() => {
    return activeData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [activeData, currentPage]);

  return (
    <main className="w-full px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-max">
        
        <div className="col-span-1 lg:col-span-3">
          <RegistroClinico value={"Perfil"} />
        </div>

        <div className="lg:col-span-2 lg:row-span-2">
          <div className="card h-full">
            <Account />
          </div>
        </div>

        <div>
          <div className="card h-full bg-white overflow-hidden">
            <EntregaPieChart 
              counts={{
                enviadas: entregaEnviadas.length,
                aceptadas: entregaAceptadas.length,
                rechazadas: entregaRechazadas.length
              }} 
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card h-full bg-white">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Mis Entregas
              </h3>

              <SelectEntregaPerfil 
                activeTab={activeTab} 
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setCurrentPage(1); // 🔥 Reset correcto
                }} 
              />
              
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