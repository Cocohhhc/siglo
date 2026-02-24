'use client'
import Button from "@/src/components/ui/button/button";
import { useRouter } from "next/navigation";

//Icons
import { RiIdCardFill } from "react-icons/ri";
import { FaBriefcaseMedical } from "react-icons/fa6";
import { FaListCheck } from "react-icons/fa6";

export default function RegistroClinico({value}) {

  function renderIcon(value) {
  switch (value) {
    case "Home":
      return <FaBriefcaseMedical />
    case "Lista":
      return <FaListCheck />;
    case "Perfil":
      return <RiIdCardFill />;
    case "Entrega":
      return <FaListCheck />;
    default:
      return null;
  }
}

  const router = useRouter()
  
  const logOut = () => {
    router.replace('/')
  }

  return (
    <section className="flex items-center justify-between w-full py-4 px-1">
      <article className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg"
          style={{ background: 'linear-gradient(135deg, var(--color-500), var(--color-600))' }}
        >
          {renderIcon(value)}
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--color-900)' }}>{value}</h1>
          <div className="w-8 h-0.5 rounded-full mt-1" style={{ background: 'var(--color-500)' }}></div>
        </div>
      </article>

      <article>
        <Button width="full" size="sm" onClick={logOut} type="button" value="🔄" variant="history" />
      </article>
    </section>
  );
}
