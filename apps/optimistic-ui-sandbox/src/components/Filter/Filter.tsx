import styles from "./Filter.module.css";
import { Box } from "../Box/Box";
import { type ChangeEvent } from "react";

export type FilterItems<T> = {
  value: T;
  label: T;
  role: string;
  type: string;
  id: string;
  name: string;
};

type FilterProps<T> = {
  items: FilterItems<T>[];
  selected: T;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Filter = <T extends string>({
  items,
  selected,
  onChange
}: FilterProps<T>) => (
  <Box className={styles.card}>
    <div
      className={styles.inputsBox}
      role="radiogroup"
      aria-label="Filter todos"
    >
      {items.map((item) => (
        <div
          key={item.id}
          role={item.role}
          aria-checked={selected === item.value}
        >
          <input
            type={item.type}
            id={item.id}
            name={item.name}
            value={item.value}
            checked={selected === item.value}
            onChange={onChange}
          />
          <label htmlFor={item.id}>{item.label}</label>
        </div>
      ))}
    </div>
  </Box>
);
