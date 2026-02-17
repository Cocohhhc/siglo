'use client'
//Import
import clsx from "clsx"

///Componentes
import Button from "@/src/components/ui/button/button"
const setVariant = {
  primary: "grid grid-cols-3 max-md:grid-cols-1 gap-5 p-12 card bg-(--color-50)",
  decline: "grid grid-cols-2 max-md:grid-cols-1 gap-5 p-12 card bg-(--color-50)",
  update: "grid grid-cols-3 max-md:grid-cols-1 gap-5 p-12 card bg-(--color-50)",
}
// Este componente maneja el formulario de registro de pacientes,   //
// paso los datos al estado global para mostrarlos en la home page //
export default function FormularyPacient({
    onSubmit,
    value,
    children,
    onCancel,
    variant,
    text,
    description
}) {
  return (
    <section
      className="flex flex-col items-center justify-between gap-6 px-6 ">
      <article className="text-2xl w-full">
        <h2>{text}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </article>
      {/* Formulario de registro de paciente */}
      <form onSubmit={onSubmit} className={clsx(setVariant[variant])}>
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
