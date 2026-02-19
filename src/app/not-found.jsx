'use client';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/src/components/ui/button/button';

export default function NotFound() {
  return (
    <main className="h-screen w-full flex flex-col items-center justify-center p-6 bg-(--color-50)">
      <div className="flex flex-col items-center max-w-lg text-center gap-8">
        
        {/* Imagen animada */}
        <div className="relative animate-bounce-slow">
          <div className="absolute inset-0 bg-(--color-200) rounded-full opacity-20 blur-2xl scale-110"></div>
          <Image
            src="/doctorConfundido.png" // Asegúrate de que este nombre sea correcto
            alt="Doctor confundido"
            width={300}
            height={300}
            className="relative z-10 drop-shadow-xl"
            priority
          />
        </div>

        {/* Texto */}
        <div className="space-y-4">
          <h1 className="text-8xl font-black text-(--color-900) opacity-10">404</h1>
          <h2 className="text-3xl font-bold text-(--color-800) -mt-8">¡Ups! Página no encontrada</h2>
          <p className="text-(--text-primary) text-lg max-w-sm mx-auto">
            Parece que el doctor no encuentra el expediente que buscas. Puede que la dirección sea incorrecta.
          </p>
        </div>

        {/* Botón */}
        <div className="w-full max-w-xs">
          <Link href="/home" className="w-full">
            <Button 
              value="Volver al inicio" 
              variant="primary" 
              width="full" 
              size="md"
            />
          </Link>
        </div>

      </div>
    </main>
  );
}
