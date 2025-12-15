'use client'
import { usePathname } from "next/navigation";

export function usePageName() {
  const pathname = usePathname();

  const pageName = pathname.split("/").pop() || "home";

  const limpio = pageName.replace(/[^a-zA-Z0-9]/g, "");

  if (limpio.length === 0) return new Error("Pagina no encontrada");

  return limpio.charAt(0).toUpperCase() + limpio.slice(1);

}
