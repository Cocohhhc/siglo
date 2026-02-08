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
            <div className=" w-full min-[1024px]:flex items-center justify-center">
                <section className="">
                    <AsideHomePage />
                </section>

                <main className="px-6 min-[1024px]:w-[70%] min-[1024px]:mt-10 min-[1024px]:ml-20 ">
                    {children}
                </main>
            </div>
    )
}