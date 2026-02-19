import { apiRoute } from "@/src/routes/route";

const url = "entrega";

export const entregaServices = () => {
    //----------------------
    // Listar entregas recibidas
    //----------------------
    async function entregaList(userId: string) {
        const res = await apiRoute(`${url}/recibidas/${userId}`, {
            method: "GET"
        });
        return res;
    };

    //----------------------
    // Listar entregas enviadas
    //----------------------
    async function entregaEnviadas(userId: string) {
        const res = await apiRoute(`${url}/enviadas/${userId}`, {
            method: "GET"
        });
        return res;
    };

    //----------------------
    // Listar entregas aceptadas
    //----------------------
    async function entregaAceptadas(userId: string) {
        const res = await apiRoute(`${url}/aceptadas/${userId}`, {
            method: "GET"
        });
        return res;
    };

    //----------------------
    // Listar entregas rechazadas
    //----------------------
    async function entregaRechazadas(userId: string) {
        const res = await apiRoute(`${url}/rechazadas/${userId}`, {
            method: "GET"
        });
        return res;
    };

    //----------------------
    // Obtener entrega por id
    //----------------------
    async function entregaById(id: string) {
        const res = await apiRoute(`${url}/findOne/${id}`, {
            method: "GET"
        });
        return res;
    };

    //----------------------
    // Aceptar entrega
    //----------------------
    async function entregaAceptar(id: string) {
        const res = await apiRoute(`${url}/aceptar/${id}`, {
            method: "POST"
        });
        return res;
    };

    //----------------------
    // Rechazar entrega
    //----------------------
    async function entregaRechazar(id: string) {
        const res = await apiRoute(`${url}/rechazar/${id}`, {
            method: "POST"
        });
        return res;
    };

    return { entregaList, entregaEnviadas, entregaAceptadas, entregaRechazadas, entregaById, entregaAceptar, entregaRechazar };
}