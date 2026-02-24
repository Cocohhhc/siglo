"use client";
// Hooks
import { usePageName } from "@/src/hook/usePageName";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { validateData } from "@/src/hook/formValid";
// Actions
import { updatePacienteAction, createRegisterAction } from "@/src/actions/list.page.actions";
// Components
import InputLogin from "@/src/components/ui/inputs/inputs";
import RegistroClinico from "@/src/components/ui/lista/registroClinico";
import List from "@/src/components/listComponents/list/list";
import FormList from "@/src/components/listComponents/formList";
import UsersMenu from "@/src/components/listComponents/userMenu/usersMenu";
import ErrorComponent from "@/src/components/ui/error/errorComponent";
import NotFound from "@/src/components/ui/error/notFound";

// ── Departamentos simulados ──
const DEPARTAMENTOS_SIMULADOS = {
  1: "Emergencias",
  2: "Cardiología",
  3: "Pediatría",
  4: "Cirugía",
  5: "Laboratorio",
  6: "Radiología",
};

export default function ListaClient({ pacientes = [], usuarios = [] }) {
  const pathName = usePageName();
  // Esto es momentaneo hasta que se arregle ya en la version final //
  // Enriquecer usuarios con departamento simulado
  const usuariosEnriquecidos = useMemo(() => {
    return usuarios.map(u => {
      // Si ya tiene objeto departamento, respetarlo
      if (u.departamento && typeof u.departamento === 'object') return u;
      // Mapear departamentoId a nombre simulado
      const depId = u.departamentoId ?? u.departamento_id ?? u.departamento;
      const depName = DEPARTAMENTOS_SIMULADOS[depId] || `Departamento ${depId || '?'}`;
      return {
        ...u,
        departamento: { id: depId, name: depName },
      };
    });
  }, [usuarios]);

  // UI state local (solo UI: modales, inputs, formularios)
  const [filterText, setFilterText] = useState("");
  const [updateOpen, setUpdateOpen] = useState(false);
  const [emisorMenuOpen, setEmisorMenuOpen] = useState(false);

  const [message, setMessage] = useState("");
  const [type, setType] = useState("success" | "error" | null);
  const [showMessage, setShowMessage] = useState(false);

  const [infoRegister, setInfoRegister] = useState({
    emisor_id: 4,
    paciente_id: undefined,
    receptor_id: undefined,
  });

  const router = useRouter();

  // filtered list (no usamos useState para mantener la lista - usamos la prop original)
  const filtered = useMemo(() => {
    if (!filterText) return pacientes;
    return pacientes.filter((p) => String(p.idNumber ?? "").includes(filterText));
  }, [pacientes, filterText]);

  // Acciones que llaman Server Actions
  const onUpdate = async (e, data, schema) => {
    e.preventDefault();

    if (!validateData(data, schema)) {
      setMessage("Debe ingresar todos los campos correctamente");
      setType("error");
      setShowMessage(true);
      hideMessage();
      return;
    }
    
    const res = await updatePacienteAction(data);
    
    if (res.ok) {
      setMessage(res.data?.message || res.message || "Operación realizada correctamente");
      setType("success");
    } else {
      setMessage(res.message || "Ocurrió un error inesperado");
      setType("error");
    }
    
    setShowMessage(true);
    setUpdateOpen(false);
    hideMessage();
  };

  // 🔥 Oculta mensaje automáticamente
  const hideMessage = () => {
    setTimeout(() => {
      setShowMessage(false);
      setType(null);
      setMessage("");
      router.refresh();
    }, 3000);      
  };

  const onCreateRegister = async () => {
    if (!infoRegister.paciente_id || !infoRegister.receptor_id) {
      return alert("Información incompleta para crear registro");
    }
    try {
      await createRegisterAction(infoRegister);
      setEmisorMenuOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Error al crear registro");
    }
  };

  const onGetEmisor = (id) => {
    setInfoRegister((s) => ({ ...s, paciente_id: Number(id) }));
    setEmisorMenuOpen(true);
  };

  const onSelectReceptor = (receptor_id) => {
    setInfoRegister((s) => ({ ...s, receptor_id: Number(receptor_id) }));
  };

  return (
    <section>
      <RegistroClinico value={pathName} />

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
        filtered.map((p) => (
          <div key={p.id} className="mt-6">
            <List info={p} buttonCreate={onGetEmisor} buttonUpdate={() => setUpdateOpen(true)} />
          </div>
        ))
      ) : (
        <NotFound message="No se encontraron resultados" />
      )}

      {/* Update Modal */}
      {updateOpen && (
        <>
          <div onClick={() => setUpdateOpen(false)} className="fixed inset-0 bg-black/50 z-40" />
          <div className="fixed z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[80vh] flex items-center justify-center">
            <FormList onUpdate={onUpdate} onCancel={() => setUpdateOpen(false)} />
          </div>
        </>
      )}

      {/* Emisor / Users Modal */}
      {emisorMenuOpen && (
        <>
          <div onClick={() => setEmisorMenuOpen(false)} className="fixed inset-0 bg-black/50 z-40" />
          <div className="fixed z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[80vh] bg-white rounded-2xl overflow-hidden">
            <UsersMenu users={usuariosEnriquecidos} onSelect={(id) => onSelectReceptor(id)} onSubmit={onCreateRegister} />
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