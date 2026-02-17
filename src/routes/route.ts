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


export const apiRoute = async (
  route: string,
  options?: RequestInit
) => {
  try {
    const response = await fetch(`http://localhost:3001/${route}`, {
      headers: { 
        "Content-Type": "application/json", 
        "Accept": "application/json" 
      },
      credentials: "include",
      ...options
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    throw error;
  }
}