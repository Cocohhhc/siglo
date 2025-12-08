// /app/dashboard/layout.js
import { ReactNode } from "react";

//Components
import NavHome from "@/src/components/homeComponents/navHome/nav";
import AsideHomePage from "@/src/components/homeComponents/asideHome/aside";

type Props = {
    children: ReactNode
};

export default function DashboardLayout({ children, }: Props) {
    return (
        <div className=" min-h-screen sm:grid md:flex">
            <section className="sm:w-full md:w-[20%] sti">
                <NavHome />
                <AsideHomePage />
            </section>
            <main className="max-w-[80%] mb-10 p-6 bg-zinc-50">
                {children}
            </main>
        </div>
    );
}