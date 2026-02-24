import Image from "next/image";
export default function NotFound({message}) {
    return (
        <section>
            <div className="flex flex-col items-center justify-center mt-4">
                <div className="bg-gray-200/50 border border-(--color-900)/20 card">
                    <p className="text-center text-2xl font-bold text-(--color-900)/50">{message}</p>
                    <Image src="/doctorConfundido.png" alt="notFound" width={500} height={500}/>
                    <p className="text-center text-lg font-bold text-(--color-900)/50">No se encontraron resultados</p>
                </div>
            </div>
        </section>
    )
}