"use client";
import clsx from "clsx";
import { useRouter } from "next/navigation";

type buttonProps = {
  variant?: "primary" | "secundary" | "history" | "accept" | "decline";
  value?: string;
  type?: string;
  className?: string;
  onClick?: () => void;
};

export default function Button({
  value,
  type,
  variant = "primary",
  className,
  onClick,
}: buttonProps) {
  const styles = {
    primary:
      "bg-(--color-50) shadow-2xl text-(--color-500) rounded-xl px-10 py-2 text-ms hover:bg-(--color-600) hover:text-(--color-50) focus:bg-(--color-800)",

    secundary:
      "bg-(--color-900)/40 shadow-2xl text-(--color-50) rounded-xl px-10 py-2 text-ms hover:bg-(--color-600) hover:text-(--color-50) focus:bg-(--color-800)",

    history:
      "border-b-emerald-600 border-b-3 px-5 py-3 text-lg text-emerald-600 hover:bg-gray-300 focus:bg-gray-300 ",

    accept:
      "bg-green-200 rounded-lg px-5 py-3 w-full text-xl shadow-md grid place-items-center hover:bg-green-100 focus:bg-green-300 ",

    decline:
      "bg-pink-200 rounded-lg px-5 py-3 w-full text-xl shadow-md grid place-items-center hover:bg-pink-300 focus:bg-pink-400 ",
  };

  return (
    <button onClick={onClick} className={clsx(styles[variant], className)}>
      {value}
    </button>
  );
}
