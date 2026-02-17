'use client'
// Hooks
import { usePageName } from "@/src/hook/usePageName";
import { useEffect, useState } from "react";
import { useFormSession } from "@/src/hook/useFormData";

// Services
import { authServices } from "@/src/services/auth.services";
import { userServices } from "@/src/services/user.services";

// Components
import InputLogin from "@/src/components/ui/inputs/inputs";
import RegistroClinico from "@/src/components/ui/lista/registroClinico";
import List from "@/src/components/listComponents/list";
import FormList from "@/src/components/listComponents/formList";
import UsersMenu from "@/src/components/listComponents/usersMenu";  
import NotFound from "@/src/components/ui/notFound/notFound";

export default function ListaPage() {
  const pathName = usePageName();

  const [info, setInfo] = useState([]);
  const [emisor, setEmisor] = useState([]);
  const [getEmisor, setGetEmisor] = useState(false);
  const [emisorMenu, setEmisorMenu] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [formData, setFormData] = useState({});
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  const { list, updatePaciente, createRegister } = authServices();
  const { userList } = userServices();
  const { data } = useFormSession();  
  // const [infoRegister, setInfoRegister] = useState({
  //   paciente_id: Number(),
  //   receptor_id: Number(receptor_id),
  //   emisor_id: Number(data.id),
  // });
  //----------------------
  // Obtener datos
  //----------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await list();
        setInfo(result);
        setOriginalData(result);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if(!getEmisor) return;
    const fetchData = async () => {
      try {
        const result = await userList();
        setEmisor(result);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getEmisor]);

  //----------------------
  // Actualizar datos
  //----------------------
  const onUpdate = () => {
    updatePaciente(formData);
    setUpdate(false);
  };  

  //----------------------
  // Buscar pacientes
  //----------------------
  const searchData = (e) => {
    if(e.target.value === ""){
      return setInfo(originalData);
    }
    const result = originalData.filter(info => info.idNumber.includes(e.target.value));
    return setInfo(result);
  }

  //----------------------
  // Crear registro
  //----------------------
  const onCreateRegister = (receptor_id) => {
    
    // createRegister(info);
    // setUpdate(false);
  };

  const onGetEmisor = (id) => {
    setGetEmisor(true);
    setEmisorMenu(true);

    const info = {
      emisor_id: data.id,
      paciente_id: id,
    };
    console.log(id)
  }
  
  //----------------------
  // Renderizar
  //----------------------
  return (
    <section>
      {
        loading ? (
          <div>
            <RegistroClinico value={pathName} />
            <div className="flex justify-center items-center text-2xl">
              <p>Cargando...</p>
            </div>
          </div>
        ) : (
          <article className="flex flex-col gap-4">
            <RegistroClinico value={pathName} />

            <div className="flex flex-col gap-4">
              <p>Busca los pacientes por su cedula</p>
              <InputLogin
                variant="primary"
                placeholder="Buscar paciente..."
                onChange={(e) => searchData(e)}
              />
            </div>
          </article>
        )
      }

      {
      info.length > 0 ? info.map(info => {
        return(
          <div className="mt-6" key={info.id}>
            <List info={info} buttonCreate={onGetEmisor} buttonUpdate={() => {setUpdate(true)}}/>
          </div>
        )
      }) : <NotFound message="No se encontraron resultados" />}

      <section>
        { update && 
        <>
        <div onClick={() => {setUpdate(false)}} className="w-full h-screen z-0 top-0 left-0 absolute bg-(--color-900)/50"></div>
        <div className="
          flex flex-col items-center justify-center w-[50vw] h-[80vh] 
          gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 
          -translate-y-1/2 z-50
        ">
         <FormList setData={setFormData} onUpdate={onUpdate} onCancel={() => {setUpdate(false)}} />
        </div>
        </>
        }

        <section>
          {
            emisorMenu && (
              <>
              <div onClick={() => {setEmisorMenu(false)}} className="w-full h-screen z-0 top-0 left-0 absolute bg-(--color-900)/50"></div>
              <div className="
                flex flex-col items-center justify-center w-[50vw] h-[80vh] 
                gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 
                -translate-y-1/2 z-50 bg-white
              ">
                <UsersMenu users={emisor} onSelect={(id) => onCreateRegister(id)} />
              </div>
              </>
            )
          }
        </section>
      </section>
    </section>
  );
};