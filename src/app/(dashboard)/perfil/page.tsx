'use client'
import { usePageName } from "@/src/hook/usePageName"

import Account from "@/src/components/perfilComponents/account/account"
import RegistroClinico from "@/src/components/ui/lista/registroClinico"

export default function PageList() {
    const pageName = usePageName()
    return (
        <main>
        <RegistroClinico value={pageName}/>
            <Account />
        </main>
    )
}