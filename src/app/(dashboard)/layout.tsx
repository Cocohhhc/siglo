// /app/dashboard/layout.js
import { ReactNode } from "react";

//Components
import AsideHomePage from "@/src/components/templateComponents/asideHome/aside";

type Props = {
    children: ReactNode
};

export default function DashboardLayout({ children, }: Props) {
    return (
            <div className="relative w-full min-h-screen bg-(--color-50)">
                <AsideHomePage />

                <main className="
                    w-full px-6 pb-10 transition-all duration-300
                    lg:w-auto lg:ml-56 lg:pt-10 
                ">
                    {children}
                </main>
            </div>
    )
}