import EntregaClient from "./entregaClient";
import { entregaList, entregaEnviadas, entregaAceptadas, entregaRechazadas } from "@/src/services/entrega.services";

export const dynamic = "force-dynamic"; // opcional: fuerza re-fetch en cada request

export default async function Entrega() {
    const userId = "4";
    const entrega = await entregaList(userId);
    const variableEntregaEnviadas = await entregaEnviadas(userId);
    const variableEntregaAceptadas = await entregaAceptadas(userId);
    const variableEntregaRechazadas = await entregaRechazadas(userId);

    return <EntregaClient entrega={entrega} entregaEnviadas={variableEntregaEnviadas} entregaAceptadas={variableEntregaAceptadas} entregaRechazadas={variableEntregaRechazadas} />
}