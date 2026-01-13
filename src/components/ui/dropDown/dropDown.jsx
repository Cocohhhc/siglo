
export default function DropDowm ({}) {
    function setValue(){
        return console.log("El valor")
    }
    return (
    <section>
        <select name="departament" id="departament-selection" className=" 
        bg-cyan-50 hover:ring-green-300
        w-full rounded-lg py-2 px-4
        text-ls
        "
        >
            <option className="hover:bg-green-100">Departamento</option>
            <option onClickCapture={setValue} value="mercedes">Mercedes</option>
            <option value="tesla">Tesla</option>
            <option value="volvo">Volvo</option>
        </select>   
    </section>

    )
}