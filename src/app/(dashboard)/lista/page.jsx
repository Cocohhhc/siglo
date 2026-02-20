// app/lista/page.tsx  (Server Component)
import ListaClient from "./listClient";
import { list } from "@/src/services/auth.services";
import { userList } from "@/src/services/user.services"; // asumo que ya existe y es server-safe

export const dynamic = "force-dynamic"; // opcional: fuerza re-fetch en cada request

export default async function ListaPage() {
  // fetch en paralelo
  const pacientesRes = await list();
  const usuariosRes = await userList();
  const pacientes = pacientesRes ?? [];
  const usuarios = usuariosRes ?? [];
  console.log(usuarios);
  return <ListaClient pacientes={pacientes} usuarios={usuarios} />;
}