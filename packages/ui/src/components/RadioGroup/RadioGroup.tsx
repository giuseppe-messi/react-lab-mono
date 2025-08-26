import { type ChangeEvent } from "react";
import { Box } from "../Box";
import styles from "./RadioGroup.module.css";

interface RadioGroupProps {
  items: string[];
  selected: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function RadioGroup({ items, selected, onChange }: RadioGroupProps) {
  return (
    <Box className={styles.card}>
      <div
        aria-label="Filter todos"
        className={styles.inputsBox}
        role="radiogroup"
      >
        {items.map((item) => (
          <div className={styles.inputBox} key={item}>
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
        ))}
      </div>
    </Box>
  );
}
