import { CgProfile } from "react-icons/cg";
import Link from "next/link";

//Icons
import { FaPersonCirclePlus } from "react-icons/fa6";
import { FaListCheck } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";


//Components


export default function AsideHomePage() {
  return (
    <aside className="p-4 w-full ">
      <ul className="flex flex-col gap-3 text-[1.3rem]">                    
        <li className="grid grid-cols-2 items-center">
          <FaPersonCirclePlus />
          <Link href="/">Paciente</Link>
        </li>

        <li className="grid grid-cols-2 items-center">
          <FaListCheck />
          <Link href="/">Lista</Link>
        </li>
        <li className="grid grid-cols-2 items-center">
            <FaPerson />
            <Link href="/">Perfil</Link>
        </li>
      </ul>
    </aside>
  );
}
