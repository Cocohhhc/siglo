import {useState} from "react"

export default function DropDowm ({
    setUserDepartament
}) {
    const [departament, setDepartament] = useState("")

    function setValue(e){
        // console.log(e.target.value);
        setDepartament(e.target.value);
        setUserDepartament(e.target.value);
    }
    

    return (
    <section>
        <select name="departament" id="departament-selection" className=" 
        bg-cyan-50 hover:ring-green-300
        w-full rounded-lg py-2 px-4
        text-ls
        "
        value={departament}
        onChange={setValue}
        >
            <option className="hover:bg-green-100">Departamento</option>
            <option value="Medico">Medico</option>
        </select>   
    </section>

    )
}