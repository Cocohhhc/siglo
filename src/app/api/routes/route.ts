"use server";

interface PacientData {
  name: string;
  lastName: string;
  cardId: string;
  dataOfBirth: string;
  age: number;
  
  // gmail: string;
  // password: string;
  // departamentId: string;
}


// Datos de paciente
export async function register(data: PacientData): Promise<void> {
  console.log(data)
  const res = await fetch("http://10.70.1.192:3000/pacientes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al iniciar sesión");
  }
}

// export async function list() {

//         const res = await fetch("https://dogapi.dog/api/v2/breeds", {
//             method: "GET",
//             headers: { "Content-Type": "application/json" },
//         });
//         if (!res.ok) {
//             throw new Error("Error al obtener datos del paciente");
//         }

//         const data = await res.json();
//         return data;
// };

import { NextResponse } from "next/server";
import { data } from "../../lib/data";
//This function handles GET requests to the /api/products endpoint
export async function GET() {
  return NextResponse.json({ 
    data
  });
}



//Obtienes los datos del formulario

// export async function getData(formData: FormData): Promise<void> {
//   const usertName = (formData.get("userName") ?? "").toString().trim();
//   const userLastName = (formData.get("userLastName") ?? "").toString().trim();
//   const userCardId = (formData.get("userCardId") ?? "").toString().trim();
//   const userGmail = (formData.get("userGmail") ?? "").toString().trim();
//   const userPassword = (formData.get("userPassword") ?? "").toString().trim();
//   const departamentId = (formData.get("departamentId") ?? "").toString().trim();

//   const values = {
//     usertName,
//     userLastName,
//     userCardId,
//     userGmail,
//     userPassword,
//     departamentId
//   };

//   console.log(values)
//   // LOGIN
//   // await loginAction({
//   //   gmail: userGmail,
//   //   password: userPassword,
//   // });
// }
