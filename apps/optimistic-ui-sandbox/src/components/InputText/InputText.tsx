import styles from "./InputText.module.css";

type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref: React.RefObject<HTMLInputElement | null>;
  id: string;
  name: string;
  className?: string;
  placeholder: string;
};

export const InputText = ({
  ref,
  id,
  name,
  className,
  placeholder,
  ...props
}: InputTextProps) => (
  <input
    ref={ref}
    id={id}
    name={name}
    type="text"
    className={`${styles.input} ${className}`}
    placeholder={placeholder}
    aria-label={`${name} label`}
    required
    {...props}
  />
);
