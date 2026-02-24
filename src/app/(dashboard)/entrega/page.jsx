import EntregaClient from "./entregaClient";
import { entregaList, entregaEnviadas, entregaAceptadas, entregaRechazadas } from "@/src/services/entrega.services";

export const dynamic = "force-dynamic"; // opcional: fuerza re-fetch en cada request

export default async function Entrega() {
    const userId = "4";
    const entrega = await entregaList(userId);
    const variableEntregaEnviadas = await entregaEnviadas(userId);
    const variableEntregaAceptadas = await entregaAceptadas(userId);
    const variableEntregaRechazadas = await entregaRechazadas(userId);
    
    console.log("Viendo todas las entregas pendiente", entrega.data)
    console.log("Viendo todas las entregas enviadas", variableEntregaEnviadas.data)
    console.log("Viendo todas las entregas aceptadas", variableEntregaAceptadas.data)
    console.log("Viendo todas las entregas rechazadas", variableEntregaRechazadas.data)

    return <EntregaClient entrega={entrega.data} entregaEnviadas={variableEntregaEnviadas.data} entregaAceptadas={variableEntregaAceptadas.data} entregaRechazadas={variableEntregaRechazadas.data} />
}