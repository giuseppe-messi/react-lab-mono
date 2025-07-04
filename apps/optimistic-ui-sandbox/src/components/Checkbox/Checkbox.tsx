import styles from "./Checkbox.module.css";

import type { ReactNode } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  labelText?: ReactNode;
  labelPosition?: "before" | "after";
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({
  name,
  labelText,
  labelPosition = "after",
  checked,
  onChange,
  ...props
}: InputProps) => {
  return (
    <label htmlFor={name} className={styles.label}>
      {labelPosition === "before" && labelText}
      <input
        type="checkbox"
        role="switch"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      {labelPosition === "after" && labelText}
    </label>
  );
};
