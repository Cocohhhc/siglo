import PageList from "./perfilClient";
import { entregaEnviadas, entregaAceptadas, entregaRechazadas } from "@/src/services/entrega.services";

export const dynamic = "force-dynamic"; // opcional: fuerza re-fetch en cada request

export default async function Page() {
    const userId = "4";
    const entregaEnviadasData = await entregaEnviadas(userId);
    const entregaRechazadasData = await entregaRechazadas(userId);
    const entregaAceptadasData = await entregaAceptadas(userId);
    
    return (
        <PageList 
            entregaEnviadas={entregaEnviadasData.data} 
            entregaAceptadas={entregaAceptadasData.data} 
            entregaRechazadas={entregaRechazadasData.data} 
        />
    )
}