"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { validateData } from "@/src/hook/formValid";
import { updatePacienteAction, createRegisterAction } from "@/src/actions/list.page.actions";

import InputLogin from "@/src/components/ui/inputs/inputs";
import RegistroClinico from "@/src/components/ui/lista/registroClinico";
import List from "@/src/components/listComponents/list/list";
import FormList from "@/src/components/listComponents/formList";
import UsersMenu from "@/src/components/listComponents/userMenu/usersMenu";
import ErrorComponent from "@/src/components/ui/error/errorComponent";
import NotFound from "@/src/components/ui/error/notFound";
import Pagination from "@/src/components/ui/pagination/pagination";

const DEPARTAMENTOS_SIMULADOS = {
  1: "Emergencias",
  2: "Cardiología",
  3: "Pediatría",
  4: "Cirugía",
  5: "Laboratorio",
  6: "Radiología",
};

export default function ListaClient({ pacientes = [], usuarios = [] }) {

  const [localPacientes, setLocalPacientes] = useState(pacientes);

  const usuariosEnriquecidos = useMemo(() => {
    return usuarios.map(u => {
      if (u.departamento && typeof u.departamento === 'object') return u;

      const depId = u.departamentoId ?? u.departamento_id ?? u.departamento;
      const depName = DEPARTAMENTOS_SIMULADOS[depId] || `Departamento ${depId || '?'}`;

      return {
        ...u,
        departamento: { id: depId, name: depName },
      };
    });
  }, [usuarios]);

  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [updateOpen, setUpdateOpen] = useState(false);
  const [emisorMenuOpen, setEmisorMenuOpen] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  const [message, setMessage] = useState("");
  const [type, setType] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const [infoRegister, setInfoRegister] = useState({
    emisor_id: 4,
    paciente_id: undefined,
    receptor_id: undefined,
  });

  // 🔄 Sync props iniciales
  useEffect(() => {
    setLocalPacientes(pacientes);
  }, [pacientes]);

  // 🔎 Filtro optimizado
  const filtered = useMemo(() => {
    if (!filterText) return localPacientes;
    return localPacientes.filter(p =>
      String(p.idNumber ?? "").includes(filterText)
    );
  }, [localPacientes, filterText]);

  // 🔄 Reset page correctamente
  useEffect(() => {
    setCurrentPage(1);
  }, [filterText]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  // 🔥 AUTO HIDE MESSAGE
  useEffect(() => {
    if (!showMessage) return;
    const timer = setTimeout(() => {
      setShowMessage(false);
      setMessage("");
      setType(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showMessage]);

  // ✅ OPTIMISTIC UPDATE
  const onUpdate = useCallback(async (e, data, schema) => {
    e.preventDefault();

    if (!validateData(data, schema)) {
      setMessage("Debe ingresar todos los campos correctamente");
      setType("error");
      setShowMessage(true);
      return;
    }

    const previous = localPacientes;

    setLocalPacientes(prev =>
      prev.map(p => p.id === data.id ? { ...p, ...data } : p)
    );

    try {
      const res = await updatePacienteAction(data);

      if (!res?.ok) {
        setLocalPacientes(previous);
        setMessage(res.message || "Error al actualizar");
        setType("error");
      } else {
        setMessage("Actualizado correctamente");
        setType("success");
      }

    } catch {
      setLocalPacientes(previous);
      setMessage("Error inesperado");
      setType("error");
    }

    setShowMessage(true);
    setUpdateOpen(false);

  }, [localPacientes]);

  const onCreateRegister = useCallback(async () => {

    if (!infoRegister.paciente_id || !infoRegister.receptor_id) {
      setMessage("Información incompleta");
      setType("error");
      setShowMessage(true);
      return;
    }

    try {
      const res = await createRegisterAction(infoRegister);

      if (!res?.ok) {
        setMessage("Error al crear registro");
        setType("error");
      } else {
        setMessage("Registro creado correctamente");
        setType("success");
      }

      setShowMessage(true);
      setEmisorMenuOpen(false);

    } catch {
      setMessage("Error inesperado");
      setType("error");
      setShowMessage(true);
    }

  }, [infoRegister]);

  const onGetEmisor = useCallback((id) => {
    setInfoRegister(s => ({ ...s, paciente_id: Number(id) }));
    setEmisorMenuOpen(true);
  }, []);

  const onSelectReceptor = useCallback((receptor_id) => {
    setInfoRegister(s => ({ ...s, receptor_id: Number(receptor_id) }));
  }, []);

  return (
    <section>
      <RegistroClinico value="Lista" />

      <div className="flex flex-col gap-4">
        <p>Busca los pacientes por su cedula</p>
        <InputLogin
          variant="primary"
          placeholder="Introduzca la cedula del paciente"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      {filtered.length > 0 ? (
        <>
          {paginatedData.map((p) => (
            <div key={p.id} className="mt-6">
              <List
                info={p}
                buttonCreate={onGetEmisor}
                buttonUpdate={() => {
                  setUpdateOpen(true);
                  setUpdateData(p);
                }}
              />
            </div>
          ))}

          <Pagination
            totalItems={filtered.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <NotFound message="No se encontraron resultados" />
      )}

      {updateOpen && (
        <>
          <div onClick={() => setUpdateOpen(false)} className="fixed inset-0 bg-black/50 z-40" />
          <div className="fixed z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[80vh] flex items-center justify-center">
            <FormList
              userData={updateData}
              onUpdate={onUpdate}
              onCancel={() => setUpdateOpen(false)}
            />
          </div>
        </>
      )}

      {emisorMenuOpen && (
        <>
          <div onClick={() => setEmisorMenuOpen(false)} className="fixed inset-0 bg-black/50 z-40" />
          <div className="fixed z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[80vh] bg-white rounded-2xl overflow-hidden">
            <UsersMenu
              users={usuariosEnriquecidos}
              onSelect={onSelectReceptor}
              onSubmit={onCreateRegister}
            />
          </div>
        </>
      )}

      {showMessage && (
        <ErrorComponent
          message={message}
          type={type}
        />
      )}
    </section>
  );
}