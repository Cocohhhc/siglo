'use client'
//Import

///Componentes
import Button from "@/src/components/ui/button/button"
// Este componente maneja el formulario de registro de pacientes,   //
// paso los datos al estado global para mostrarlos en la home page //
export default function FormularyPacient({
    onSubmit,
    value,
    children,
    onCancel,
}) {
  return (
    <section
      className="flex flex-col items-center justify-between gap-6 px-6 ">
      {/* Formulario de registro de paciente */}
      <form onSubmit={onSubmit} className="flex flex-row flex-wrap gap-5 p-12 card bg-(--color-50)">
        <article className="text-2xl w-full">
          <h2>Inserte Datos De Paciente</h2>
        </article>
        {children}
        {
          value === "Actualizar" ?
          <>
          <Button type="submit" variant="primary" value={value} />
          <Button type="button" variant="decline" size="small" width="md" value="Cancelar" onClick={onCancel}/>
          </>
          :
          <Button type="submit" variant="primary" value={value} />
        }
      </form>
    </section>
  );
}
