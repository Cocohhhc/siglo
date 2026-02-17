import { apiRoute } from "@/src/routes/route";

const url = "entrega";

export const entregaServices = () => {
    //----------------------
    // Listar entregas
    //----------------------
    async function entregaList(userId: string) {
        const res = await apiRoute(`${url}/recibidas/${userId}`, {
            method: "GET"
        });
        return res;
    };

    //----------------------
    // Listar entregas
    //----------------------
    async function entregaEnviadas(userId: string) {
        const res = await apiRoute(`${url}/enviadas/${userId}`, {
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

    return { entregaList, entregaEnviadas, entregaById, entregaAceptar, entregaRechazar };
}