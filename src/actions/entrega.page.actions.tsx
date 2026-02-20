"use server"
import { entregaById, entregaAceptar, entregaRechazar } from "@/src/services/entrega.services";

export async function entregaByIdAction(id: string) {
    await entregaById(id);
    return true;
}

export async function entregaAceptarAction(id: string) {
    await entregaAceptar(id);
    return true;
}

export async function entregaRechazarAction(id: string) {
    await entregaRechazar(id);
    return true;
}