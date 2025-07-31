import clsx from "clsx";
import styles from "./button.module.css";

export const SIZES = ["sm", "md", "lg"] as const;
export type Size = (typeof SIZES)[number];

export const FILLMODES = ["full", "outline"] as const;
export type FillMode = (typeof FILLMODES)[number];

export const VARIANTS = [
  "default",
  "success",
  "warning",
  "error",
  "white"
] as const;
export type Variant = (typeof VARIANTS)[number];

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
