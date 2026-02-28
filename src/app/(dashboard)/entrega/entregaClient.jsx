'use client';

import React, { useState, useEffect, useMemo, useCallback } from "react";

import { 
  entregaAceptarAction, 
  entregaRechazarAction, 
  entregaByIdNumberAction 
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

  const [activeTab, setActiveTab] = useState('recibidas');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [dataOfEntrega, setDataOfEntrega] = useState({
    recibidas: entrega || [],
    enviadas: entregaEnviadas || [],
    aceptadas: entregaAceptadas || [],
    rechazadas: entregaRechazadas || [],
  });

  const [filterText, setFilterText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // 🔄 Sincronizar props del server
  useEffect(() => {
    setDataOfEntrega({
      recibidas: entrega || [],
      enviadas: entregaEnviadas || [],
      aceptadas: entregaAceptadas || [],
      rechazadas: entregaRechazadas || [],
    });
  }, [entrega, entregaEnviadas, entregaAceptadas, entregaRechazadas]);

  // 🔄 Reset page
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, filterText]);

  // 🔎 Búsqueda con debounce optimizado
  useEffect(() => {
    if (!filterText.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await entregaByIdNumberAction(filterText);
        if (res?.ok && res?.data) {
          const searchData = res.data;
          setSearchResults(Array.isArray(searchData) ? searchData : [searchData]);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error(error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [filterText]);

  // 📊 Datos activos memorizados
  const activeData = useMemo(() => {
    return dataOfEntrega[activeTab] || [];
  }, [dataOfEntrega, activeTab]);

  const displayData = useMemo(() => {
    return filterText.trim() ? searchResults : activeData;
  }, [filterText, searchResults, activeData]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return displayData.slice(start, start + itemsPerPage);
  }, [displayData, currentPage]);

  // ✅ OPTIMISTIC UPDATE - ACEPTAR
  const aceptar = useCallback(async (id) => {
    const previous = dataOfEntrega;

    setDataOfEntrega(prev => {
      const item = prev.recibidas.find(i => i.id === id);
      if (!item) return prev;

      return {
        ...prev,
        recibidas: prev.recibidas.filter(i => i.id !== id),
        aceptadas: [item, ...prev.aceptadas],
      };
    });

    try {
      const res = await entregaAceptarAction(id);
      if (!res?.ok) setDataOfEntrega(previous);
    } catch {
      setDataOfEntrega(previous);
    }
  }, [dataOfEntrega]);

  // ✅ OPTIMISTIC UPDATE - RECHAZAR
  const rechazar = useCallback(async (id) => {
    const previous = dataOfEntrega;

    setDataOfEntrega(prev => {
      const item = prev.recibidas.find(i => i.id === id);
      if (!item) return prev;

      return {
        ...prev,
        recibidas: prev.recibidas.filter(i => i.id !== id),
        rechazadas: [item, ...prev.rechazadas],
      };
    });

    try {
      const res = await entregaRechazarAction(id);
      if (!res?.ok) setDataOfEntrega(previous);
    } catch {
      setDataOfEntrega(previous);
    }
  }, [dataOfEntrega]);

  return (
    <main>
      <section>
        <RegistroClinico value="Entrega" />
      </section>

      <section>

        <SelectEntrega 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        <article className="mt-4">
          <p>Busca las entregas por la cédula del paciente</p>
          <div className="relative">
            <InputLogin 
              onChange={(e) => setFilterText(e.target.value)} 
              type="text"
              value={filterText} 
              placeholder="Ingrese la cédula del paciente"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="animate-spin h-5 w-5 border-2 border-zinc-500 border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>
        </article>

        <article className="mt-4">

          {displayData.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {paginatedData.map((item) => (
                  <GridEntrega 
                    key={item.id} 
                    info={item} 
                    aceptar={aceptar} 
                    rechazar={rechazar}
                    variant="standard"
                  />
                ))}
              </div>

              <Pagination 
                totalItems={displayData.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <NotFound 
              message={
                filterText.trim()
                  ? "No se encontraron entregas para esta búsqueda"
                  : `No hay entregas ${activeTab} disponibles`
              } 
            />
          )}

        </article>

      </section>
    </main>
  );
}