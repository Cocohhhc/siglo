export default function ModalPacient({
    info
}) {
    return (
        <section>
            <div className="bg-(--color-50) card p-4 rounded-lg flex gap-4">
                <div className="">
                    <p>{info.registro.paciente.name}</p>
                    <p>{info.registro.paciente.lastName}</p>
                </div>
                <div className="">
                    <p>{info.registro.paciente.idNumber}</p>
                </div>
                <div className="">
                    <p>{info.registro.paciente.fechaDeNacimiento}</p>
                    <p>{info.registro.paciente.edad}</p>
                </div>
            </div>
        </section>
    )
}