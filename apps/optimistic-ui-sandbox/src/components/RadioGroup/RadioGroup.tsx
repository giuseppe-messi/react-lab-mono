import styles from "./RadioGroup.module.css";
import { Box } from "../Box/Box";
import { type ChangeEvent } from "react";

// export type RadioGroupItems<T> = {
//   value: T;
//   label: T;
//   role: string;
//   type: string;
//   id: string;
//   name: string;
// };

// type FilterProps<T> = {
//   items: RadioGroupItems<T>[];
//   selected: T;
//   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//   className?: string;
// };

type RadioGroupProps<T> = {
  items: T[];
  selected: string;
  getItemId: (item: T) => string;
  getItemValue: (item: T) => string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export const RadioGroup = <T,>({
  items,
  selected,
  getItemId,
  getItemValue,
  onChange,
  className
}: RadioGroupProps<T>) => (
  <Box className={`${className} ${styles.card}`}>
    <div
      className={styles.inputsBox}
      role="radiogroup"
      aria-label="Filter todos"
    >
      {items.map((item) => {
        const id = getItemId(item);
        const value = getItemValue(item);

        return (
          <div key={id} role="radio" aria-checked={selected === value}>
            <input
              type="radio"
              id={id}
              name={value}
              value={value}
              checked={selected === value}
              onChange={onChange}
            />
            <label htmlFor={id}>{value}</label>
          </div>
        );
      })}
    </div>
  </Box>
);
