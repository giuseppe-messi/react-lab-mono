import clsx from "clsx";
import styles from "./InputText.module.css";

export const INPUTTEXT_SIZES = ["sm", "md", "lg"] as const;
export type InputTextSize = (typeof INPUTTEXT_SIZES)[number];

type InputTextProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  ref?: React.LegacyRef<HTMLInputElement> | undefined;
  label?: string;
  size?: InputTextSize;
  id: string;
  name: string;
  className?: string;
  placeholder?: string;
};

export function InputText({
  ref,
  label,
  size = "md",
  id,
  name,
  className,
  placeholder,
  ...props
}: InputTextProps) {
  const combinedClassName = clsx(
    styles.input,
    styles[`size--${size}`],
    className
  );

  return (
    <div className={styles.box}>
      {label ? <label htmlFor={name}>{label}</label> : null}
      <input
        aria-label={`${name} label`}
        className={combinedClassName}
        id={id}
        name={name}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    </div>
  );
}
