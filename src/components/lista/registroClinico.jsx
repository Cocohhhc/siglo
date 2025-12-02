import Button from "@/src/components/ui/button/button";

export default function RegistroClinico() {
  const handleClick = () => {
    console.log("Botón de registro clínico clickeado");
  };

  return (
    <section className="flex flex-row gap-4 px-4 w-full justify-between items-center-safe ">
      <article className="flex flex-row gap-4">
        <div className="">
          <Button type="button" value="Pacientes" variant="history" />
        </div>
        <div className="">
          <Button type="button" value="Revisados" variant="history" />
        </div>
      </article>
    <article>
      
    </article>
      <div className="m-auto">
        <Button type="button" value="🔄" variant="history" />
      </div>
    </section>
  );
}
