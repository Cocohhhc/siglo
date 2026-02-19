'use client'
//Import
import clsx from "clsx"

///Componentes
import Button from "@/src/components/ui/button/button"

const setVariant = {
  primary: "grid grid-cols-3 max-md:grid-cols-1 gap-5",
  decline: "grid grid-cols-2 max-md:grid-cols-1 gap-5",
  update: "grid grid-cols-3 max-md:grid-cols-1 gap-5",
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
    <section className="flex flex-col gap-6">
      {/* Header del formulario */}
      <article>
        <h2 className="text-xl font-bold" style={{ color: 'var(--color-900)' }}>{text}</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-primary)' }}>{description}</p>
      </article>

      {/* Formulario */}
      <form onSubmit={onSubmit} 
        className={clsx("rounded-2xl bg-white p-6", setVariant[variant])}
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        {children}

        {/* Botones de acción */}
        <div className={clsx(
          "flex gap-3 pt-2",
          value === "Actualizar" ? "col-span-full" : ""
        )}>
          <Button type="submit" variant="primary" value={value} />
          {value === "Actualizar" && (
            <Button type="button" variant="decline" size="sm" width="md" value="Cancelar" onClick={onCancel}/>
          )}
        </div>
      </form>
    </section>
  );
}
