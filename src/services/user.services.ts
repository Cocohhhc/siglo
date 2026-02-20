import { apiRoute } from "@/src/routes/route";

const url = "users";

//----------------------
// Listar entregas
//----------------------
export async function userList() {
    const res = await apiRoute(`${url}/all`, {
        method: "GET"
    });
    return res;
};
