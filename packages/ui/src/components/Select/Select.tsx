import styles from "./Select.module.css";

export type SelectProps<T> = React.SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  labelText?: string;
  options: T[];
  getOptionValue: (option: T) => string;
  getOptionLabel: (option: T) => string;
  getOptionId: (option: T) => string;
  getOptionDisabled?: (option: T) => boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
};

export function Select<T>({
  name,
  labelText,
  options,
  getOptionValue,
  getOptionLabel,
  getOptionId,
  getOptionDisabled,
  value,
  onChange,
  placeholder,
  ...props
}: SelectProps<T>) {
  return (
    <label className={styles.label} htmlFor={name}>
      {labelText}
      <select
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        {...props}
      >
        <option disabled value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            disabled={getOptionDisabled?.(option)}
            key={getOptionId(option)}
            value={getOptionValue(option)}
          >
            {getOptionLabel(option)}
          </option>
        ))}
      </select>
    </label>
  );
}
