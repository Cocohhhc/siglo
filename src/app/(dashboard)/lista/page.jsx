import ListaClient from "./listClient";
import { list } from "@/src/services/auth.services";
import { userList } from "@/src/services/user.services";

export default async function ListaPage() {

  const [pacientesRes, usuariosRes] = await Promise.all([
    list(),
    userList()
  ]);

  return (
    <ListaClient
      pacientes={pacientesRes?.data ?? []}
      usuarios={usuariosRes?.data ?? []}
    />
  );
}