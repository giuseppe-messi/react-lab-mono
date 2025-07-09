import styles from "./InputText.module.css";

type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref: React.LegacyRef<HTMLInputElement> | undefined;
  id: string;
  name: string;
  className?: string;
  placeholder?: string;
};

export function InputText({
  ref,
  id,
  name,
  className,
  placeholder,
  ...props
}: InputTextProps) {
  return (
    <input
      aria-label={`${name} label`}
      className={`${styles.input} ${className}`}
      id={id}
      name={name}
      placeholder={placeholder}
      ref={ref}
      required
      type="text"
      {...props}
    />
  );
}
