import React from "react";
import "./Button.css";

export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  variant?: "primary" | "secondary";
  onClick: () => void;
};

const VARIANT_CLASS: Record<string, string> = {
  primary: "button--primary",
  secondary: "button--secondary"
};

export const Button: React.FC<Props> = ({
  variant = "primary",
  className = "",
  text,
  onClick,
  ...props
}) => {
  const classes = ["button", VARIANT_CLASS[variant], className].join(" ");

  return (
    <button className={classes} onClick={onClick} {...props}>
      {text}
    </button>
  );
};
