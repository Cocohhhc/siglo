"use server";
//---------------------
// Interface 
//---------------------
interface PacientData {
  name: string;
  lastName: string;
  cardId: string;
  dataOfBirth: string;
  age: number;
};

// //----------------------
// // Error handeling Class
// //----------------------
// export class ApiRequestError extends Error {
//   statusCode?: number;
//   errors?: Record<string, string>;

//   constructor(message: string, statusCode?: number, errors?: Record<string, string>) {
//     super(message);
//     this.name = "ApiRequestError";
//     this.statusCode = statusCode;
//     this.errors = errors;
//   }
// }

async function handleResponse(res: Response) {
  const contentType = res.headers.get("content-type");

  let data = null;
  if (contentType?.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) {
    const message = data?.message || `Error ${res.status}`;
    throw new Error(message);
  }

  return data;
}


//-----------------------
// Registro del Paciente
//-----------------------
export async function register(data: PacientData): Promise<void> {

  try{
    const res = await fetch("http://10.70.1.192:3000/pacientes/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(res);
  }
  catch (error: any){ 
    console.error("Error en register:", error.message);
    throw error; 
  }
};

//-----------------------
//Getting all pacient
//-----------------------
export async function list() {
  try{
    const res = await fetch("http://10.70.1.192:3000/pacientes/all", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
    });
    return await handleResponse(res);
  }catch(error: any){
    console.error('Error del Backend:', error.message);
    throw error;
  };
};

// //Sendding id 
// export async function seddingId(id: string) {
//   try{
//     const res = await fetch(`http://10.70.1.192:3000/pacientes/profile/${id}`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         // body: JSON.stringify(id),
//     })
//     const data = await res.json();
//     console.log(data);
//     // return await handleResponse(res);
//   }catch(error: any){
//     console.error('Error al enviar', error.message);
//     throw error;
//   }
// };
// seddingId();