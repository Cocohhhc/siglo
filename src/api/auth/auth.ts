"use server";

interface LoginData {
  gmail: string;
  password: string;
}

interface RegisterData {
  name: string;
  lastName: string;
  IdNumber: string;
  mail: string;
  password: string;
  departamentId: string;
}


// LOGIN
export async function loginAction(data: LoginData): Promise<void> {
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

// REGISTER
export async function registerAction(data: RegisterData): Promise<void> {
  const res = await fetch("https://mi-backend.loca.It/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Error al registrarse");
  }
}

//Obtienes los datos del formulario

export async function getData(formData: FormData): Promise<void> {
  const userName = (formData.get("userName") ?? "").toString().trim();
  const userLastName = (formData.get("userLastName") ?? "").toString().trim();
  const userCardId = (formData.get("userCardId") ?? "").toString().trim();
  const userPassword = (formData.get("userPassword") ?? "").toString().trim();
  const userGmail = (formData.get("userGmail") ?? "").toString().trim();
  const departamentId = (formData.get("departamentId") ?? "").toString().trim();

  const values = {
    userName,
    userLastName,
    userCardId,
    userPassword,
    userGmail,
    departamentId,
  };

  // LOGIN
  await loginAction({
    gmail: userGmail,
    password: userPassword,
  });

  // REGISTER
  await registerAction({
    name: userName,
    lastName: userLastName,
    IdNumber: userCardId,
    mail: userGmail,
    password: userPassword,
    departamentId,
  });
}
