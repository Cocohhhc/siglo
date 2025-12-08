//Impoert
import { useRouter } from "next/navigation";

//hook 
import { formSelection } from "@/src/hook/formSelection"
import { useState } from "react";

//Icons
import { FaPersonCirclePlus } from "react-icons/fa6";

import Button from "@/src/components/ui/button/button";

export default function RegistroClinico() {
  const [buttonMenu, setButtonMenu] = useState(false);
  const router = useRouter()


  const handleChange = () => {
    const status = formSelection();
    setButtonMenu(status);
  };

  const handleLogOut = () => {
    router.replace('/')
  }

  return (
    <section className="flex flex-row gap-4 px-4 w-full justify-between items-center-safe ">
      <article className="flex flex-row gap-6 rounded-lg items-center text-[1.8rem]">
        <div className="">
          <Button type="button" value="Pacientes" variant="history" onClick={handleChange}/>
        </div>
        <div className="">
          <FaPersonCirclePlus className="w-full h-full"/>
        </div>
      </article>
      <article>
        <div className="m-auto">
          <Button type="button" value="🔄" variant="history" onClick={handleLogOut}/>
       </div>
      </article>
    </section>
  );
}
