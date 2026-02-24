// app/actions/patient.actions.ts
"use server";

import { updatePaciente as updatePacienteService, createRegister as createRegisterService } from "@/src/services/auth.services";
import { PacientData } from "@/src/Type/pacientData/type";
import { RegistroData } from "@/src/Type/registro/type";

export async function updatePacienteAction(data: PacientData) {
  const res = await updatePacienteService(data);
  return res;
}

export async function createRegisterAction(data: RegistroData) {
  const res = await createRegisterService(data);
  return res;
}