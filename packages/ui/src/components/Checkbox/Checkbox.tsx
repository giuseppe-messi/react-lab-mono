import type { ReactNode } from "react";
import styles from "./checkbox.module.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: ReactNode;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({
  name,
  label,
  checked,
  onChange,
  ...props
}: InputProps) => (
  <div className={styles.box}>
    <input
      checked={checked}
      id={name}
      name={name}
      onChange={onChange}
      role="switch"
      type="checkbox"
      {...props}
    />
    {Boolean(label) && (
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
    )}
  </div>
);
