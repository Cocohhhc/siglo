
import clsx from "clsx";
import Target from "@/src/components/ui/target/target";

export default function Description({ 
    description, 
    value, 
    variant = "standard", 
    size = "md", 
    width = "auto" 
}) {
    const variants = {
        standard: "flex flex-col gap-1",
        minimal: "flex items-center gap-2 py-1",
        accent: "bg-gray-50 p-3 rounded-lg border border-gray-100",
    };

    const sizes = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
    };

    const widths = {
        auto: "w-auto",
        full: "w-full",
    };

    return (
        <div className={clsx(variants[variant], widths[width], "transition-all duration-200")}>
            <div className={clsx("flex items-center", variant === "minimal" ? "shrink-0" : "mb-1")}>
                <Target 
                    size={size === "lg" ? "md" : "sm"} 
                    position="left" 
                    variant="secondary" 
                    value={description} 
                    className="!w-fit"
                />
            </div>
            <p className={clsx(
                sizes[size], 
                "text-gray-900 font-medium truncate",
                variant === "minimal" ? "flex-1" : ""
            )}>
                {value}
            </p>
        </div>
    );
}