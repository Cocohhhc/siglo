import clsx from "clsx";


export default function Target({ value }) {
    if (typeof value === "string") {
        return (
            <div className="">
                <div className="
                bg-(--color-500) rounded-[6%]
                text-(--p) py-2 px-4
                ">
                    <p>{value}</p>
                </div>
            </div>
        )
    } else {
        throw new Error("El valor del Target debe ser tipo string");
    }
}