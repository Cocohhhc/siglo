import Image from "next/image";
export default function NavHome() {
  return (
    <div className="bg-(--color-600) p-4 grid place-items-center">
      <Image
      alt="Logo del siglo21"
        src="/logo-centro-medico-docente-siglo-21.1d027d8.webp"
        width={100}
        height={100}
      />
      {/* <h1 className="text-3xl text-amber-50 font-bold">Siglo 21</h1> */}
    </div>
  );
}
