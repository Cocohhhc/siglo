'use client'
// Hooks
import { usePageName } from "@/src/hook/usePageName";
import { useEffect, useState } from "react";
import { useFormSession } from "@/src/hook/useFormData";

// Services
import { authServices } from "@/src/services/auth.services";

// Components
import InputLogin from "@/src/components/ui/inputs/inputs";
import RegistroClinico from "@/src/components/ui/lista/registroClinico";
import List from "@/src/components/listComponents/list";
import Button from "@/src/components/ui/button/button";
import FormularyPacient from "@/src/components/form/pacienteFormulario";

export default function ListaPage() {
  const pathName = usePageName();

  const [info, setInfo] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("Nombre" || "");
  const [lastName, setLastName] = useState("Apellido" || "");
  const [idNumber, setIdNumber] = useState("Cedula" || "");
  const [fechaDeNacimiento, setFechaDeNacimiento] = useState("Fecha de nacimiento" || "");
  const [edad, setEdad] = useState("Edad" || "");

  const { list, updatePaciente, createRegister, getRegistro } = authServices();
  const { data } = useFormSession();
  //----------------------
  // Obtener datos
  //----------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await list();
        const getRes = await getRegistro("1");
        console.log(getRes);
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
  
  //----------------------
  // Actualizar datos
  //----------------------
  const onUpdate = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      lastName: lastName,
      IdNumber: idNumber,
      fecha_de_nacimiento: fechaDeNacimiento,
      Edad: Number(edad),
    }
    updatePaciente(data);
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
  const onCreateRegister = (id) => {
    const info = {
      departamento_id: Number(data.departament),
      paciente_id: Number(id),
    }
    createRegister(info);
    setUpdate(false);
  };

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

            <InputLogin
              variant="primary"
              placeholder="Buscar paciente..."
              onChange={(e) => searchData(e)}
            />
          </article>
        )
      }

      {info.map(info => {
        return(
          <div className="mt-6" key={info.id}>
            <List info={info} buttonCreate={onCreateRegister} buttonUpdate={() => {setUpdate(true)}}/>
          </div>
        )
      })}

      <section>
        { update && 
        <>
        <div onClick={() => {setUpdate(false)}} className="w-full h-screen z-0 top-0 left-0 absolute bg-(--color-900)/50"></div>
        <div className="
          flex flex-col items-center justify-center w-[50vw] h-[80vh] 
          gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 
          -translate-y-1/2 z-50
        ">
          <FormularyPacient
          value="Actualizar"
          onSubmit={onUpdate}
          onCancel={() => {setUpdate(false)}}
        >
            <InputLogin variant="history" placeholder="Nombre" name="pacienteName" onChange={(e) => { setName(e.target.value)}} />
        
            <InputLogin variant="history" placeholder="Apellido" name="pacientLastName" onChange={(e) => { setLastName(e.target.value)}} />
        
            <InputLogin variant="history" placeholder="Cedula" name="pacientId" onChange={(e) => { setIdNumber(e.target.value)}} />
        
            <InputLogin variant="history" type="datetime-local" placeholder="Fecha de nacimiento" name="dataOfBirth" onChange={(e) => { setFechaDeNacimiento(e.target.value)}} />
        
            <InputLogin variant="history" placeholder="Edad" type="number" name="yearsOld" onChange={(e) => { setEdad(e.target.value)}} />
        </FormularyPacient>
        </div>
        </>
        }
      </section>
    </section>
  );
};