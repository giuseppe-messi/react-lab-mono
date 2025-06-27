import styles from "./LoadingSpinner.module.css";

type Size = "sm" | "md" | "lg";

type LoadingSpinnerProps = {
  size?: Size;
  color?: string;
};

const sizeMap: Record<Size, number> = {
  sm: 24,
  md: 36,
  lg: 60
};

export const LoadingSpinner = ({
  size = "md",
  color = "currentColor"
}: LoadingSpinnerProps) => (
  <div className={styles.box}>
    <svg
      width={sizeMap[size]}
      height={sizeMap[size]}
      viewBox="0 0 24 24"
      role="status"
      aria-label="Loading"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeDasharray="31.4 31.4"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
);
