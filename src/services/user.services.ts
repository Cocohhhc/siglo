import { apiRoute } from "@/src/routes/route";

const url = "users";

export const userServices = () => {
    //----------------------
    // Listar entregas
    //----------------------
    async function userList() {
        const res = await apiRoute(`${url}/all`, {
            method: "GET"
        });
        return res;
    };

    return { userList };
}