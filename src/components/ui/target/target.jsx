export default function Target({ value }) {
    if (typeof value === "string") {
        return (
            <div className="">
                <div className="
                bg-[#00FFFF] shadow-zinc-200 shadow-2xl rounded-[6%]
                py-2 px-6 text-[60%]
                ">
                    <p>{value}</p>
                </div>
            </div>
        )
    } else {
        throw new Error("El valor del Target debe ser tipo string");
    }
}