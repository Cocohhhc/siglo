import {useState} from "react"

export default function DropDowm ({
    setUserDepartament,
    options = [],
    defaultLabel = "Departamento"
}) {
    const [departament, setDepartament] = useState("")

    function setValue(e){
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
            <option value="">{defaultLabel}</option>
            {options.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.name}</option>
            ))}
        </select>   
    </section>

    )
}