'use client';
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { usePathname } from "next/navigation";

//Icons
import { FaPersonCirclePlus } from "react-icons/fa6";
import { FaListCheck } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";


//Components


export default function AsideHomePage() {
  const pathName = usePathname();
  return (
    <aside className="p-4 w-full h-full">
      <ul className="flex flex-col gap-3 text-[1.3rem]">                    
        <li className={pathName === "/home" ? "aside__links__active"  :  "aside__links" }>
          <FaPersonCirclePlus />
          <Link href="/home">Paciente</Link>
        </li>

        <li className={pathName === "/lista" ? "aside__links__active"  :  "aside__links" }>
          <FaListCheck />
          <Link href="/lista">Lista</Link>
        </li>
        <li className={pathName === "/perfil" ? "aside__links__active"  :  "aside__links" }>
            <FaPerson />
            <Link href="/perfil">Perfil</Link>
        </li>
      </ul>
    </aside>
  );
}
