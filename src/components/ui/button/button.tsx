import clsx from "clsx";

type buttonProps = {
  variant?: "primary" | "secundary";
  value?: string;
  type?: string;
  className?: string;
};

export default function Button({
  value,
  type,
  variant = "primary",
  className,
}: buttonProps) {
  const styles = {
    primary:
      "bg-cyan-50 shadow-ms rounded-lg px-10 py-2 text-ms hover:bg-cyan-100 focus:bg-blue-200",

    secundary:
      "bg-cyan-50 rounded-lg px-5 py-3 text-ls [focus:outline-none border-2 border-green-500 ",
  };

  return <button className={clsx(styles[variant], className)}>{value}</button>;
}
