'use client';
//Imports
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

//Icons
import { FaPersonCirclePlus } from "react-icons/fa6";
import { FaListCheck } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";
import { FaTruckMedical } from "react-icons/fa6";


//Components
import NavHome from "../navHome/nav";
import Button from "@/src/components/ui/button/button";

export default function AsideHomePage() {
  const pathName = usePathname();
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <aside className="card max-[1024px]:w-full min-[1024px]:fixed top-0 left-0 min-[1024px]:h-screen">
      <div className="">
        <NavHome />
      </div>
      <ul className="
      min-[1024px]:flex min-[1024px]:flex-col min-[1024px]:gap-3 text-[1.3rem] 
      max-[1024px]:flex flex-row max-[1024px]:justify-between
      ">
        <div className={`
        ${menu ? "max-[1024px]:flex gap-3 max-[1024px]:transition-all max-[1024px]:duration-300" : "max-[1024px]:hidden max-[1024px]:transition-all max-[1024px]:duration-300"}
        `}>
          <li className={pathName === "/home" ? "aside__links__active" : "aside__links"}>
            <FaPersonCirclePlus />
            <Link href="/home">Paciente</Link>
          </li>

          <li className={pathName === "/lista" ? "aside__links__active"  :  "aside__links" }>
            <FaListCheck />
            <Link href="/lista">Lista</Link>
          </li>
          <li className={pathName === "/entrega" ? "aside__links__active"  :  "aside__links" }>
            <FaTruckMedical />
            <Link href="/entrega">Entrega</Link>
          </li>
          <li className={pathName === "/perfil" ? "aside__links__active"  :  "aside__links" }>
            <FaPerson />
            <Link href="/perfil">Perfil</Link>
          </li>
          
        </div>
        <li className="min-[1024px]:hidden">
          <Button onClick={handleMenu} variant="primary" value="Menu" />
        </li>
      </ul>    
    </aside>
  );
}
