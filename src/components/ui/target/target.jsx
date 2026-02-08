import clsx from "clsx";

export default function Target({ value,
    variant = "primary",
    className,
    size = "md",
    position = "center"
 }) {
    const sizeStyles = {
        sm: "p-[2px] text-sm",
        md: "p-[4px] text-md",
        lg: "p-[6px] text-lg",
    };
    const positionStyles = {
        left : "flex items-center justify-start",
        center : "flex items-center justify-center",
        right : "flex items-center justify-end",
    }
    const styles = {
        primary: `bg-[var(--color-800)] text-[var(--color-50)] rounded-[5%] ${sizeStyles[size]} ${positionStyles[position]}`,
        secondary: `bg-[var(--color-500)] text-[var(--color-900)] target ${sizeStyles[size]} ${positionStyles[position]}`,
        success: `bg-[var(--color-600)] rounded-[5%] ${sizeStyles[size]} ${positionStyles[position]}`,
        warning: `bg-[var(--color-700)] rounded-[5%] ${sizeStyles[size]} ${positionStyles[position]}`,
        error: `bg-[var(--color-800)] rounded-[5%] ${sizeStyles[size]} ${positionStyles[position]}`,
    };
    if (typeof value === "string") {
        return (
            <div className="w-full">
                <div  className={clsx(styles[variant], className)}>
                    <p>{value}</p>
                </div>
            </div>
        )
    } else {
        throw new Error("El valor del Target debe ser tipo string");
    }
};