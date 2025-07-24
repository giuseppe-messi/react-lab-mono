import clsx from "clsx";
import styles from "./button.module.css";

type Size = "sm" | "md" | "lg";
type FillMode = "full" | "outline";
type Variant = "default" | "success" | "warning" | "error";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void;
  text: string;
  size?: Size;
  fillMode?: FillMode;
  variant?: Variant;
};

export const Button = ({
  onClick,
  text,
  size = "md",
  fillMode = "full",
  variant = "default",
  ...props
}: ButtonProps) => {
  const sizeStyle = styles[`size--${size}`];
  const fillModeStyle = styles[`fillMode--${fillMode}`];
  const variantStyle = styles[`variant--${variant}`];

  return (
    <button
      className={clsx(styles.button, sizeStyle, fillModeStyle, variantStyle)}
      onClick={onClick}
      type="button"
      {...props}
    >
      {text}
    </button>
  );
};
