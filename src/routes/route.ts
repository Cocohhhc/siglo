"use server";


async function handleResponse<T>(res: Response){
  const contentType = res.headers.get("content-type");

  let data: any = null;

  if (contentType?.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      message:
        data?.message ||
        defaultStatusMessages[res.status] ||
        "Error inesperado",
      field: data?.field,
    };
  }
  return {
    ok: true,
    status: res.status,
    message: data?.message || "Operación realizada correctamente",
    data,
  };
}

const defaultStatusMessages: Record<number, string> = {
  400: "Datos inválidos",
  401: "No autorizado",
  403: "Acceso denegado",
  404: "Recurso no encontrado",
  409: "Conflicto en la solicitud",
  500: "Error interno del servidor",
};
const API_URL = "100.93.115.32:3002";
export async function apiRoute<T>(
  route: string,
  options?: RequestInit
) {
  try {
    const response = await fetch(`http://${API_URL}/${route}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      ...options,
    });

    return await handleResponse<T>(response);

  } catch (error) {
    console.error("Error de conexión:", error);

    return {
      ok: false,
      status: 500,
      message: "No se pudo conectar con el servidor",
    };
  }
}