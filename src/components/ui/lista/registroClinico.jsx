'use client'
import Button from "@/src/components/ui/button/button";
import { useRouter } from "next/navigation";

export default function RegistroClinico({value}) {
  const router = useRouter()
  
  const logOut = () => {
    router.replace('/')
  }

  return (
    <section className="flex flex-row gap-4 px-4 w-full justify-between items-center-safe text-3xl">
      <article className="">
        <div className="">
          <h1 className="border-b-2 border-(--color-500)">{value}</h1>
        </div>
      </article>
    <article>
      
    </article>
      <div className="">
        <Button onClick={logOut} type="button" value="🔄" variant="history" />
      </div>
    </section>
  );
}
