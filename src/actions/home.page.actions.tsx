"use server" 
import { register } from "@/src/services/auth.services";
import { PacientData } from "@/src/Type/pacientData/type";

export async function registerPatient(data: PacientData) {
    await register(data);
    return true;
}