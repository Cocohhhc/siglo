'use client'
import RegistroClinico from "@/src/components/ui/lista/registroClinico";
import { usePageName } from "@/src/hook/usePageName";
import { use, useEffect, useState } from "react";
import { list, seddingId} from '@/src/app/api/routes/route';
import InputLogin from "@/src/components/ui/inputs/inputs";

export default function ListaPage(){
const pathName = usePageName();

const [activateSearch, setActivateSearch] = useState(true);
const [searchValue, setSearchValue] = useState("");
const [data, setData] = useState([]);
const [abble, setAbble] = useState(false);
const [loading, setLoading] = useState(true);
    

  useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await list();
      setData(result);

    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
      setAbble(true);
    }
  };

  fetchData();
}, []);

// const filteredData = data.filter(item => {

//     const value = searchValue;

//     return (
//       item.id?.includes(value)
//     );
// });

  const sendId = () => {
    data.map(items => {
        // seddingId(items.id);
        console.log(items.name);
      });
  };
  sendId();
//Return:
    

if (loading) {
    return (
      <section>
        <div className=""><h1>Hola</h1></div>
      <div>
        <RegistroClinico value={pathName} />
        <div className="flex justify-center items-center text-2xl">
          <p>Cargando...</p>
        </div>
      </div>
      </section>
    );
  };

return (
    <section>
      <article className="flex flex-col gap-4">
        <RegistroClinico value={pathName} />

        <InputLogin
          variant="primary"
          placeholder="Buscar paciente..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </article>

    {data.map(info => {
      <article>
        <p>{info.name}</p>
        <div
          key={info.id}
            className="
              flex flex-row flex-wrap p-4 text-[1.1rem] font-normal
              justify-around rounded-lg card
              max-md:grid place-items-center
              "
            >
            <div>{info.name}</div>
            <div>{info.lastName}</div>
            <div>{info.age}</div>
            <div>{info.date_of_birth}</div>
            <div>{info.IdNumber}</div>
      </div>
    </article>
    })}
  </section>
);
};