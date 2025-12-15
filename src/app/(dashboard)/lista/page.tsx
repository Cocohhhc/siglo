'use client'
import RegistroClinico from "@/src/components/ui/lista/registroClinico"
import { usePageName } from "@/src/hook/usePageName"

export default function ListaPage(){
    const pathName = usePageName();

    return(  
        <div className="">
            <RegistroClinico value={pathName}/>
            <h1>Hola mundo</h1>
        </div> 
    )
}