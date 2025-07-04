import styles from "./Select.module.css";

type SelectProps<T> = React.SelectHTMLAttributes<HTMLSelectElement> & {
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

export const Select = <T,>({
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
}: SelectProps<T>) => {
  return (
    <label htmlFor={name} className={styles.label}>
      {labelText}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={getOptionId(option)}
            value={getOptionValue(option)}
            disabled={getOptionDisabled?.(option)}
          >
            {getOptionLabel(option)}
          </option>
        ))}
      </select>
    </label>
  );
};
