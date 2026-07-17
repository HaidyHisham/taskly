import React, { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  ...props
}) => {
  const btnVariants = {
    primary: "text-white rounded-4px primary-gradient shadow-sm font-semibold",
    secondary: "text-primary font-semibold",
    ghost: "text-slate-md/60 font-medium",
  };

  return (
    <button
      {...props}
      className={`w-full px-6 py-2.5 text-body leading-5 flex items-center justify-center gap-0.5 capitalize cursor-pointer ${btnVariants[variant]} ${props.className}`}
    >
      {children}
    </button>
  );
};

export default Button;
