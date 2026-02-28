import EntregaClient from "./entregaClient";
import { entregaList, entregaEnviadas, entregaAceptadas, entregaRechazadas } from "@/src/services/entrega.services";

export default async function Entrega() {
    const userId = "4";
    // fetch en paralelo
    const [
        entrega,
        variableEntregaEnviadas,
        variableEntregaAceptadas,
        variableEntregaRechazadas
    ] = await Promise.all([
        entregaList(userId),
        entregaEnviadas(userId),
        entregaAceptadas(userId),
        entregaRechazadas(userId),
    ]);

    return <EntregaClient
        entrega={entrega?.data ?? []}
        entregaEnviadas={variableEntregaEnviadas?.data ?? []}
        entregaAceptadas={variableEntregaAceptadas?.data ?? []}
        entregaRechazadas={variableEntregaRechazadas?.data ?? []}
    />
}