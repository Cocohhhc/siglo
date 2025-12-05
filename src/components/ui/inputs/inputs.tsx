import { clsx } from "clsx";

type formProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "primary" | "secundary" | "error" | "history";
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
      "bg-cyan-50 rounded-lg px-10 py-3 text-ls [focus:outline-none focus:ring-2 focus:ring-green-300 ",

    secundary:
      "bg-cyan-50 rounded-lg px-10 py-3 text-ls ring-2 ring-green-500 focus:outline-none focus:ring-1 focus:ring-green-400 ",

    error:
      "bg-red-100 rounded-lg px-10 py-3 text-ls ring-2 ring-pink-600 focus:outline-none focus:ring-1 focus:ring-pink-800 ",

    history:
      "bg-zinc-100 rounded-lg p-2 text-ls ring-2 ring-zinc-300 focus:outline-none focus:ring-1 focus:ring-black ",
  };

  return (
    <input
      value={value}
      type={type}
      onChange={onChange}
      name={name}
      {...props}
      placeholder={placeholder}
      className={clsx(styles[variant], className)}
      required
    />
  );
}
