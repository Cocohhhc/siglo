import clsx from "clsx";


export default function Target({ value,
    variant = "primary",
    className
 }) {
    const styles = {
        primary: "bg-(--color-400)",
    }
    if (typeof value === "string") {
        return (
            <div className="">
                <div  className={clsx(styles[variant], className)}>
                    <p>{value}</p>
                </div>
            </div>
        )
    } else {
        throw new Error("El valor del Target debe ser tipo string");
    }
};