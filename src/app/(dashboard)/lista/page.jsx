// app/lista/page.tsx  (Server Component)
import ListaClient from "./listClient";
import { list } from "@/src/services/auth.services";
import { userList } from "@/src/services/user.services"; // asumo que ya existe y es server-safe

export const dynamic = "force-dynamic"; // opcional: fuerza re-fetch en cada request

export default async function ListaPage() {
  // fetch en paralelo de la lista de pacientes y usuarios
  const pacientesRes = await list();
  const usuariosRes = await userList();
  const pacientes = pacientesRes.data ?? [];
  const usuarios = usuariosRes.data ?? [];

  return <ListaClient pacientes={pacientes} usuarios={usuarios} />;
}