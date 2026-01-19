'use client'
import { usePageName } from "@/src/hook/usePageName"

//Icons
import { RiIdCardFill } from "react-icons/ri";


import Account from "@/src/components/perfilComponents/account/account"
import RegistroClinico from "@/src/components/ui/lista/registroClinico"

export default function PageList() {
    const pageName = usePageName()
    return (
        <main>
        <div className="flex">
             <RegistroClinico value={pageName}/> 
        </div>
        <Account />
        </main>
    )
}