// app/actions/patient.actions.ts
"use server";

import { updatePaciente as updatePacienteService, createRegister as createRegisterService } from "@/src/services/auth.services";
import { PacientData } from "@/src/Type/pacientData/type";
import { RegistroData } from "@/src/Type/registro/type";

export async function updatePacienteAction(data: PacientData) {
  await updatePacienteService(data);
  // puedes devolver info si quieres
  return true;
}

export async function createRegisterAction(data: RegistroData) {
  await createRegisterService(data);
  return true;
}