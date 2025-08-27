import clsx from "clsx";
import styles from "./button.module.css";

export const BUTTON_SIZES = ["sm", "md", "lg"] as const;
export type ButtonSize = (typeof BUTTON_SIZES)[number];

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
  size?: ButtonSize;
  fillMode?: FillMode;
  variant?: Variant;
  fullWidth?: boolean;
};

export const Button = ({
  size = "md",
  fillMode = "full",
  variant = "default",
  children,
  className,
  fullWidth = false,
  type = "button",
  ...props
}: ButtonProps) => {
  const classes = clsx(styles.button, fullWidth && styles.fullWidth, className);

  return (
    <button
      className={classes}
      data-fill-mode={fillMode}
      data-size={size}
      data-variant={variant}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
