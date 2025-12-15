// /app/dashboard/layout.js
import { ReactNode } from "react";

//Components
import NavHome from "@/src/components/templateComponents/navHome/nav";
import AsideHomePage from "@/src/components/templateComponents/asideHome/aside";
import { LuLamp } from "react-icons/lu";

type Props = {
    children: ReactNode
};

export default function DashboardLayout({ children, }: Props) {
    return (
            <div className="min-h-screen sm:grid md:flex">
                <section className="sm:w-full md:w-[14%]">
                    <NavHome />
                    <AsideHomePage />
                </section>

                <main className="w-[80%] ms-10 p-6">
                    {children}
                </main>
            </div>
    )
}