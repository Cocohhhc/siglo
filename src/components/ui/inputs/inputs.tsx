import { clsx } from "clsx";

type formProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "primary" | "error" | "success" | "history";
  value?: string;
  name?: string;
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  placeholder?: string;
};

export default function InputLogin({
  variant = "primary",
  value,
  type,
  className,
  onChange,
  placeholder,
  name,
  ...props
}: formProps) {
  const styles = {
    primary:
      "w-full bg-white rounded-xl px-4 py-3 text-sm text-(--color-900) border border-(--color-200) outline-none transition-all duration-200 focus:border-(--color-500) focus:ring-2 focus:ring-(--color-200) placeholder:text-(--text-primary)",

    error:
      "w-full bg-pink-50 rounded-xl px-4 py-3 text-sm border-2 border-pink-400 outline-none transition-all duration-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 placeholder:text-pink-300",

    success:
      "w-full bg-emerald-50 rounded-xl px-4 py-3 text-sm border-2 border-emerald-400 outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 placeholder:text-emerald-300",

    history:
      "w-full bg-(--color-50) rounded-xl px-4 py-3 text-sm border border-zinc-200 outline-none transition-all duration-200 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 placeholder:text-zinc-400",
  };

  return (
    <input
      value={value}
      type={type}
      onChange={onChange}
      name={name}
      {...props}
      placeholder={placeholder}
      maxLength={30}
      className={clsx(styles[variant], className)}
      required
    />
  );
}
