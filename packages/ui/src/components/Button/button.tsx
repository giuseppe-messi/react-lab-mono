import styles from "./button.module.css";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void;
  text: string;
  size?: ButtonSize;
};

const paddingMap: Record<ButtonSize, string> = {
  sm: "4px 8px",
  md: "8px 16px",
  lg: "12px 24px"
};

const fontSizeMap: Record<ButtonSize, string> = {
  sm: "1rem",
  md: "1rem",
  lg: "1.25rem"
};

const fontWeightMap: Record<ButtonSize, React.CSSProperties["fontWeight"]> = {
  sm: 300,
  md: "normal",
  lg: "normal"
};

export const Button = ({
  onClick,
  text,
  size = "md",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      style={{
        padding: paddingMap[size],
        fontSize: fontSizeMap[size],
        fontWeight: fontWeightMap[size]
      }}
      type="button"
      {...props}
    >
      {text}
    </button>
  );
};
