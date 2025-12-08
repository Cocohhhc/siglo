//Import
import { getData } from "@/src/api/auth/auth"


///Componentes
import InputLogin from "@/src/components/ui/inputs/inputs";
import Button from "@/src/components/ui/button/button";


export default function formularyPacient({  
  setValue, setSecondValue, setFourtValue, setThirdValue, setSFiveValue }) {

  return (
    <section
      className="
     flex flex-col items-center justify-between
    gap-6 px-6 
    rounded-lg 
    "
    > 
    <article className="text-2xl w-full">
        <h2>Inserte Datos De Paciente</h2>
    </article>
    
        <form action={getData} className="flex flex-row flex-wrap gap-5">
            <InputLogin variant="history" placeholder="Nombre"  name=" pacienteName" onChange={(e) => setValue(e.target.value)}/>

            <InputLogin variant="history" placeholder="Apellido"  name="pacientLastName"  onChange={(e) => setSecondValue(e.target.value)}/>

            <InputLogin variant="history" placeholder="Cedula"  name="pacientId" onChange={(e) => setThirdValue(e.target.value)}/>

            <InputLogin variant="history" type="datetime-local" placeholder="Fecha de nacimiento"  name="dataOfBirth" onChange={(e) => setFourtValue(e.target.value)}/>

            <InputLogin variant="history" placeholder="Edad"  name="yearsOld" onChange={(e) => setSFiveValue(e.target.value)}/>

            <InputLogin variant="history" placeholder="Fecha"  name="date" onChange={(e) => setSecondValue(e.target.value)}/>
        </form>       
    </section>
  );
}
