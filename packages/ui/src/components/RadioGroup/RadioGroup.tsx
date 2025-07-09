import { type ChangeEvent } from "react";
import { Box } from "../Box";
import styles from "./RadioGroup.module.css";

interface RadioGroupProps {
  items: string[];
  selected: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export function RadioGroup({
  items,
  selected,
  onChange,
  className
}: RadioGroupProps) {
  return (
    <Box className={`${className} ${styles.card}`}>
      <div
        aria-label="Filter todos"
        className={styles.inputsBox}
        role="radiogroup"
      >
        {items.map((item) => {
          return (
            <div aria-checked={selected === item} key={item} role="radio">
              <input
                checked={selected === item}
                id={item}
                name={item}
                onChange={onChange}
                type="radio"
                value={item}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          );
        })}
      </div>
    </Box>
  );
}
