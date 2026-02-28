"use server"
import { 
    entregaByIdNumber, 
    entregaAceptar, 
    entregaRechazar 
} from "@/src/services/entrega.services";

export async function entregaByIdNumberAction(idNumber: string) {
    return await entregaByIdNumber(idNumber);
}

export async function entregaAceptarAction(id: string) {
    return await entregaAceptar(id);
}

export async function entregaRechazarAction(id: string) {
    return await entregaRechazar(id);
}