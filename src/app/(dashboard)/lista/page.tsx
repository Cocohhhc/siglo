'use client'
import RegistroClinico from "@/src/components/ui/lista/registroClinico";
import { usePageName } from "@/src/hook/usePageName";
import { useEffect, useState } from "react";
import InputLogin from "@/src/components/ui/inputs/inputs";
// import { list } from "@/src/api/auth/auth";

interface Usuario {
        id: string,
        name: string,
        lastName: string,
        IdNumber: string,
        date_of_birth: string,
        age: string
}

export default  function ListaPage(){
const pathName = usePageName();

const [activateSearch, setActivateSearch] = useState(true);
const [searchValue, setSearchValue] = useState("");
const [data, setData] = useState<Usuario[]>([]);
const [value, setValue] = useState<Usuario | null>(null);
const [loading, setLoading] = useState(true);
    
// useEffect(() => {
//     async function getData () {
//         const gettinData = await list();
//         setValue(gettinData);
//     }
//     getData();
// },[]);

useEffect(() => {
    async function fetchData() {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

        const res = await fetch(`${baseUrl}/api/routes`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Error cargando los datos");

        const json = await res.json();
        setData(json.data); // 👈 aquí el JSON se vuelve `data`
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);


//Return:
    
    
    useEffect(() => {
    if (searchValue === "") {
      setActivateSearch(true);
      setValue(null);
      return;
    }

    const found = data.find(item => item.id === searchValue);

    if (found) {
      setValue(found);
      setActivateSearch(false);
    }
  }, [searchValue, data]);


    if (loading) {
    return (
      <div>
        <RegistroClinico value={pathName} />
        <div className="flex justify-center items-center text-2xl">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }
    
        return (
            <section>
                    <article className="flex flex-col gap-4">
                    <div className="">
                        <RegistroClinico value={pathName}/>
                    </div>
                    <div className="">
                        <InputLogin variant="primary" 
                        value={searchValue} onChange={(e) => 
                        setSearchValue(e.target.value)}/>
                    </div>
                    {
                    activateSearch ? 
                    data.map(info => (
                    <div key={info.id} className="
                    flex flex-row flex-wrap p-4 text-[1.1rem] font-normal items-center-safe justify-around rounded-lg card 
                    max-md:grid place-items-center
                    ">
                        <div className="">{info.name}</div>
                        <div className="">{info.lastName}</div>
                        <div className="">{info.age}</div>
                        <div className="">{info.date_of_birth}</div>
                        <div className="">{info.IdNumber}</div>
                    </div>
                    ))
                    : value ?
                    <div className="
                    flex flex-row flex-wrap p-4 text-[1.1rem] font-normal items-center-safe justify-around rounded-lg card 
                    max-md:grid place-items-center
                    ">
                        <div className="">{value.name}</div>
                        <div className="">{value.lastName}</div>
                        <div className="">{value.age}</div>
                        <div className="">{value.date_of_birth}</div>
                        <div className="">{value.IdNumber}</div>
                    </div>
                    : null}
                    </article>
                    
            </section> 
     ) 
    
}