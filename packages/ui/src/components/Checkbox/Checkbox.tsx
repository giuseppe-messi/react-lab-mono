import type { ReactNode } from "react";
import styles from "./checkbox.module.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  labelText?: ReactNode;
  labelPosition?: "before" | "after";
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Checkbox({
  name,
  labelText,
  labelPosition = "after",
  checked,
  onChange,
  ...props
}: InputProps) {
  return (
    <label className={styles.label} htmlFor={name}>
      {labelPosition === "before" && labelText}
      <input
        checked={checked}
        id={name}
        name={name}
        onChange={onChange}
        role="switch"
        type="checkbox"
        {...props}
      />
      {labelPosition === "after" && labelText}
    </label>
  );
}
