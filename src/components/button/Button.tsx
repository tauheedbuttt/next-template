import { ReactNode } from "react";
import Loader from "../loader/Loader";

export interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  className?: String;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "default" | string;
  children?: ReactNode;
  onClick?: (data: any) => void;
}

function Button({
  onClick,
  type = "button",
  variant = "primary",
  children,
  className = "",
  disabled,
  isLoading,
}: ButtonProps) {
  const variants: any = {
    primary: {
      bg: "bg-primary",
      hover: "hover:opacity-90",
      text: "text-accent",
    },
    secondary: {
      bg: "bg-secondary",
      hover: "hover:opacity-90",
      text: "text-accent",
    },
    accent: {
      bg: "bg-accent",
      hover: "hover:opacity-90",
      text: "text-primary",
    },
  };
  const color = variants[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${className} rounded-md ${color.bg} gap-4 px-5 flex justify-center items-center py-2 text-sm font-semibold w-full   shadow-sm  ${color.text} ${color.hover} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${color.outline}`}
    >
      <Loader color={color.text} size={6} isLoading={isLoading}>
        {children}
      </Loader>
    </button>
  );
}

export default Button;
