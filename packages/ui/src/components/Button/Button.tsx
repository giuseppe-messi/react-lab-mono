import clsx from "clsx";
import styles from "./button.module.css";

type Size = "sm" | "md" | "lg";
type FillMode = "full" | "outline";
type Variant = "default" | "success" | "warning" | "error" | "white";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void;
  size?: Size;
  fillMode?: FillMode;
  variant?: Variant;
};

export const Button = ({
  onClick,
  size = "md",
  fillMode = "full",
  variant = "default",
  children,
  className,
  ...props
}: ButtonProps) => {
  const combinedClassName = clsx(
    styles.button,
    styles[`size--${size}`],
    styles[`fillMode--${fillMode}`],
    styles[`variant--${variant}`],
    className
  );

  return (
    <button
      className={combinedClassName}
      onClick={onClick}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};
