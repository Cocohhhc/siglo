"use server"
import { entregaById, entregaAceptar, entregaRechazar } from "@/src/services/entrega.services";

export async function entregaByIdAction(id: string) {
    const res = await entregaById(id);
    return res;
}

export async function entregaAceptarAction(id: string) {
    const res = await entregaAceptar(id);
    return res;
}

export async function entregaRechazarAction(id: string) {
    const res = await entregaRechazar(id);
    return res;
}