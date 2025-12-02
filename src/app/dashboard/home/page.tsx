
//Componentes
import HistoriaClinico from "@/src/components/ui/historiaClinico/historia";
import RegistroClinico from "@/src/components/lista/registroClinico";
import NavHome from "@/src/components/navHome/nav";
import AsideHomePage from "@/src/components/asideHome/aside";

export default function HomePage() {
  return (
    
    <main className="flex flex-col h-screen bg-zinc-200">
      <nav className="w-full">
        <NavHome />
      </nav>
      <section className="flex flex-row w-full h-full justify-between">
        <aside className="bg-gray-100 p-4 w-[15vw] h-full flex flex-col">
          <AsideHomePage />
        </aside>

        <section className="flex flex-col me-8 mt-10 ">
          <article className="w-[80vw] mb-5">
            <RegistroClinico />
          </article>

          <article className="bg-gray-100 p-3 rounded-md w-full h-auto border-2 border-gray-300 ">
            <HistoriaClinico />
          </article>
        </section>
      </section>
    </main>
  );
}
