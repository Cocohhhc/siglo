export interface buttonProps {
  variant?: "primary" | "secundary" | "history" | "accept" | "decline";
  value?: string;
  type?: string;
  className?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  width?: "full" | "md" | "lg";
};