import { apiRoute } from "@/src/routes/route";


export const entregaServices = () => {

    //----------------------
    // Crear entrega
    //----------------------
    async function create(data: any) {
        const res = await apiRoute("entrega/create", {
            method: "POST",
            body: JSON.stringify(data)
        });
        return res;
    };

    //----------------------
    // Listar entregas
    //----------------------
    async function entregaList(userId: string) {
        const res = await apiRoute(`entrega/recibidas/${userId}`, {
            method: "GET"
        });
        return res;
    };

    //----------------------
    // Obtener entrega por id
    //----------------------
    async function entregaById(id: any) {
        const res = await apiRoute(`entrega/${id}`, {
            method: "GET"
        });
        return res;
    };

    //----------------------
    // Aceptar entrega
    //----------------------
    async function entregaAceptar(id: string) {
        const res = await apiRoute(`entrega/aceptar/${id}`, {
            method: "POST"
        });
        return res;
    };

    //----------------------
    // Rechazar entrega
    //----------------------
    async function entregaRechazar(id: string) {
        const res = await apiRoute(`entrega/rechazar/${id}`, {
            method: "POST"
        });
        return res;
    };

    return { create, entregaList, entregaById, entregaAceptar, entregaRechazar };
}