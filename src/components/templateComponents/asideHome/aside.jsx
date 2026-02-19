'use client';
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPersonCirclePlus, FaListCheck, FaPerson, FaTruckMedical } from "react-icons/fa6";
import NavHome from "../navHome/nav";
import Button from "@/src/components/ui/button/button";

export default function AsideHomePage() {
  const pathName = usePathname();
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  const navLinks = [
    { href: "/home", icon: <FaPersonCirclePlus />, label: "Paciente" },
    { href: "/lista", icon: <FaListCheck />, label: "Lista" },
    { href: "/entrega", icon: <FaTruckMedical />, label: "Entrega" },
    { href: "/perfil", icon: <FaPerson />, label: "Perfil" },
  ];

  return (
    <aside className="
      fixed top-0 left-0 z-40
      w-full lg:w-56 lg:h-screen
      bg-white shadow-2xl lg:shadow-[4px_0_24px_rgba(0,0,0,0.02)]
      transition-all duration-300 ease-in-out
    ">
      <div className="flex justify-between items-center p-4 lg:p-6 lg:justify-center">
        <div className="w-32 lg:w-40 transition-all duration-300">
             <NavHome />
        </div>
        
        <div className="lg:hidden">
            <Button 
              onClick={handleMenu} 
              variant="primary" 
              value={menu ? "Cerrar" : "Menú"} 
              size="sm" 
            />
        </div>
      </div>

      <nav className={`
        ${menu ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0 lg:max-h-full lg:opacity-100 lg:py-6"}
        overflow-hidden transition-all duration-500 ease-in-out
      `}>
        <ul className="flex flex-col gap-3 px-6">
          {navLinks.map((link) => {
            const isActive = pathName === link.href;
            return (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className={`
                    relative flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group overflow-hidden
                    ${isActive 
                      ? 'bg-gradient-to-r from-[var(--color-500)] to-[var(--color-600)] text-white shadow-lg shadow-[var(--color-500)]/20 translate-x-2' 
                      : 'text-[var(--color-800)] hover:bg-[var(--color-50)] hover:text-[var(--color-900)] hover:translate-x-1'
                    }
                  `}
                  onClick={() => setMenu(false)}
                >
                  <span className={`text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${isActive ? 'text-white' : 'text-[var(--color-500)]'}`}>
                    {link.icon}
                  </span>
                  <span className="font-semibold tracking-wide text-lg">{link.label}</span>
                  
                  {/* Hover indicator for non-active items */}
                  {!isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[var(--color-500)] rounded-r-full opacity-0 -translate-x-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Footer / User info placeholder could go here */}
      <div className="hidden lg:block absolute bottom-8 left-0 w-full px-6 text-center">
        <p className="text-xs text-[var(--text-primary)] opacity-60">© 2024 Siglo 21</p>
      </div>
    </aside>
  );
}
