import {apiRoute} from "../routes/route";
import { PacientData } from "@/src/Type/pacientData/type";
import { RegistroData } from "@/src/Type/registro/type";
    
//-----------------------
// Registro del Paciente
//-----------------------
export async function register(data: PacientData): Promise<void> {
      const res = await apiRoute("pacientes/create", {
      method: "POST",
      body: JSON.stringify(data)
    });
    return res;
};

//-----------------------
//Updating pacient
//-----------------------
export async function updatePaciente(data: PacientData): Promise<void> {
    const res = await apiRoute("pacientes/update", {
      method: "PUT",
      body: JSON.stringify(data)
    });
    return res;
};
//----------------------
//Creating register
//----------------------
export async function createRegister(data: RegistroData): Promise<void> {
    console.log(data);
    const res = await apiRoute("registro/create", {
      method: "POST",
      body: JSON.stringify(data)
    });
    return res;
};

export async function getRegistro(id: string): Promise<void> {
    const res = await apiRoute(`registro/${id}`, {
      method: "GET",
    });
    return res;
};


//Get
//-----------------------
//Getting all pacient 
//-----------------------
export async function list() {
    const res = await apiRoute("pacientes/all", {
      method: "GET",
    });
    return res;
};



