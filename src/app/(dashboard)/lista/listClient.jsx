"use client";
// Hooks
import { usePageName } from "@/src/hook/usePageName";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
// Actions
import { updatePacienteAction, createRegisterAction } from "@/src/actions/list.page.actions";
// Components
import InputLogin from "@/src/components/ui/inputs/inputs";
import RegistroClinico from "@/src/components/ui/lista/registroClinico";
import List from "@/src/components/listComponents/list/list";
import FormList from "@/src/components/listComponents/formList";
import UsersMenu from "@/src/components/listComponents/userMenu/usersMenu";
import NotFound from "@/src/components/ui/notFound/notFound";

export default function ListaClient({ pacientes = [], usuarios = [] }) {
  const pathName = usePageName();

  // UI state local (solo UI: modales, inputs, formularios)
  const [filterText, setFilterText] = useState("");
  const [updateOpen, setUpdateOpen] = useState(false);
  const [emisorMenuOpen, setEmisorMenuOpen] = useState(false);
  const [formData, setFormData] = useState({});
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
  const onUpdate = async () => {
    try {
      await updatePacienteAction(formData);
      setUpdateOpen(false);
      router.refresh(); // re-ejecuta page server y trae nueva lista
    } catch (err) {
      console.error(err);
      alert("Error al actualizar");
    }
  };

  const onCreateRegister = async () => {
    if (!infoRegister.paciente_id || !infoRegister.receptor_id) {
      return alert("Información incompleta para crear registro");
    }
    console.log(infoRegister);
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
          placeholder="Buscar paciente..."
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
            <FormList setData={setFormData} onUpdate={onUpdate} onCancel={() => setUpdateOpen(false)} />
          </div>
        </>
      )}

      {/* Emisor / Users Modal */}
      {emisorMenuOpen && (
        <>
          <div onClick={() => setEmisorMenuOpen(false)} className="fixed inset-0 bg-black/50 z-40" />
          <div className="fixed z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[80vh] bg-white rounded-2xl overflow-hidden">
            <UsersMenu users={usuarios} onSelect={(id) => onSelectReceptor(id)} onSubmit={onCreateRegister} />
          </div>
        </>
      )}
    </section>
  );
}