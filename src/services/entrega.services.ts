import { apiRoute } from "@/src/routes/route";

const url = "entrega";

//----------------------
// Listar entregas recibidas
//----------------------
export async function entregaList(userId: string) {
    const res = await apiRoute(`${url}/pendientes/${userId}`, {
        method: "GET"
    });
    return res;
};

//----------------------
// Listar entregas enviadas
//----------------------
export async function entregaEnviadas(userId: string) {
    const res = await apiRoute(`${url}/enviadas/${userId}`, {
        method: "GET"
    });
    return res;
};

//----------------------
// Listar entregas aceptadas
//----------------------
export async function entregaAceptadas(userId: string) {
    const res = await apiRoute(`${url}/aceptadas/${userId}`, {
        method: "GET"
    });
    return res;
};

//----------------------
// Listar entregas rechazadas
//----------------------
export async function entregaRechazadas(userId: string) {
    const res = await apiRoute(`${url}/rechazadas/${userId}`, {
        method: "GET"
    });
    return res;
};

//----------------------
// Obtener entrega por id
//----------------------
export async function entregaById(id: string) {
    const res = await apiRoute(`${url}/findOne/${id}`, {
        method: "GET"
    });
    return res;
};

//----------------------
// Aceptar entrega
//----------------------
export async function entregaAceptar(id: string) {
    const res = await apiRoute(`${url}/aceptar/${id}`, {
        method: "POST"
    });
    return res;
};

//----------------------
// Rechazar entrega
//----------------------
export async function entregaRechazar(id: string) {
    const res = await apiRoute(`${url}/rechazar/${id}`, {
        method: "POST"
    });
    return res;
};

