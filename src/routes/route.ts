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
export async function apiRoute<T>(
  route: string,
  options?: RequestInit
) {
  const API_URL = process.env.API_URL || "http://localhost:3001";
  try {
    const response = await fetch(`${API_URL}/${route}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      cache: "no-store",
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