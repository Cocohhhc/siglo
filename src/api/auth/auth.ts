"use server";

interface PacientData {
  gmail: string;
  password: string;
  departamentId: string;
}

// Datos de paciente
export async function loginAction(data: PacientData): Promise<void> {
  const res = await fetch("https://mi-backend.loca.It/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Error al iniciar sesión");
  }
}


//Obtienes los datos del formulario

export async function getData(formData: FormData): Promise<void> {
  const pacientName = (formData.get("pacienteName") ?? "").toString().trim();
  const pacientLastName = (formData.get("pacientLastName") ?? "").toString().trim();
  const pacientId = (formData.get("pacientId") ?? "").toString().trim();
  const dataOfBirth = (formData.get("dataOfBirth") ?? "").toString().trim();
  const yearsOld = (formData.get("yearsOld") ?? "").toString().trim();
  const date = (formData.get("date") ?? "").toString().trim();

  const values = {
    pacientName,
    pacientLastName,
    pacientId,
    dataOfBirth,
    yearsOld,
    date
  };

  // // LOGIN
  // await loginAction({
  //   gmail: userGmail,
  //   password: userPassword,
  // });
}
