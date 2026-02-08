'use client'
import Button from "@/src/components/ui/button/button";
import { useRouter } from "next/navigation";
import { usePageName } from "@/src/hook/usePageName";

//Icons
import { RiIdCardFill } from "react-icons/ri";
import { FaBriefcaseMedical } from "react-icons/fa6";
import { FaListCheck } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

export default function RegistroClinico({value}) {

  function renderIcon(pageName) {
  switch (pageName) {
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
  const pageName = usePageName()
  
  
  const logOut = () => {
    router.replace('/')
  }

  return (
    <section className="flex flex-row gap-4 px-4 w-full justify-between items-center-safe text-3xl">
      <article className="flex items-center gap-5">
        <div className="">
          <h1 className="border-b-2 border-(--color-500)">{value}</h1>
        </div>
        <div className="text-(--color-700)">
             {renderIcon(pageName)}
        </div> 
      </article>
    <article>
      
    </article>
      <div className="">
        <Button width="full" size="md" onClick={logOut} type="button" value="🔄" variant="history" />
      </div>
    </section>
  );
}
