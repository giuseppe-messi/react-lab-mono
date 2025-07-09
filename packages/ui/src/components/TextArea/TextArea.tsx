import styles from "./TextArea.module.css";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  ref?: React.LegacyRef<HTMLTextAreaElement> | undefined;
  id: string;
  name: string;
  placeholder?: string;
};

export function TextArea({ ref, id, name, placeholder }: TextAreaProps) {
  return (
    <textarea
      aria-label={`${name} label`}
      className={styles.textarea}
      id={id}
      name={name}
      placeholder={placeholder}
      ref={ref}
      required
    />
  );
}
