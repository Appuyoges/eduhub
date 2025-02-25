import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={`bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
