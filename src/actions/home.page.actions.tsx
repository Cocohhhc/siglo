"use server" 
import { register } from "@/src/services/auth.services";
import { PacientData } from "@/src/Type/pacientData/type";

export async function registerPatient(data: PacientData) {
    const res = await register(data);
    return res;
}