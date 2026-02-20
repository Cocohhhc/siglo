import InputLogin from "@/src/components/ui/inputs/inputs";

export default function SearchCardId({ searchData }) {
    return (
        <div>
            <p>Busca los pacientes por su cedula</p>
            <InputLogin
                variant="primary"
                placeholder="Buscar paciente..."
                onChange={(e) => searchData(e)}
            />
        </div>
    )
}