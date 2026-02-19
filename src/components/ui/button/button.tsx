
import clsx from "clsx";
import { buttonProps } from "@/src/Type/button/type";

const sizeStyles = {
  sm: "px-[5px] py-[5px] text-sm",
  md: "px-[10px] py-[10px] text-md",
  lg: "px-[15px] py-[15px] text-lg",
}

const widthStyles = {
  full: "w-full",
  md: "w-[50%]",
  lg: "w-[75%]",
}

export default function Button({
  value,
  type,
  variant = "primary",
  className,
  onClick,
  size = "sm",
  width = "full",
}: buttonProps) {
  const styles = {
    primary:
      `bg-(--color-500) shadow-2xl text-(--color-50) rounded-xl ${widthStyles[width]} ${sizeStyles[size]} hover:bg-(--color-700) hover:text-(--color-50) focus:bg-(--color-800)`,

    secundary:
      `bg-(--color-900)/30 shadow-2xl text-(--color-50) rounded-xl ${widthStyles[width]} ${sizeStyles[size]} hover:bg-(--color-600) hover:text-(--color-50) focus:bg-(--color-800)`,

    history:
      `border-b-emerald-600 border-b-3 ${widthStyles[width]} ${sizeStyles[size]} text-emerald-600 hover:bg-gray-300 focus:bg-gray-300`,

    disabled:
      `bg-(--color-500)/50 shadow-2xl text-(--color-50) rounded-xl ${widthStyles[width]} ${sizeStyles[size]}`,

    accept:
      `bg-green-200 rounded-lg ${widthStyles[width]} ${sizeStyles[size]} w-full shadow-md grid place-items-center hover:bg-green-100 focus:bg-green-300`,

    decline:
      `bg-pink-200 rounded-lg ${widthStyles[width]} ${sizeStyles[size]} w-full shadow-md grid place-items-center hover:bg-pink-300 focus:bg-pink-400`,
  };

  return (
    <button onClick={onClick} className={clsx(styles[variant], className)}>
      {value}
    </button>
  );
}
