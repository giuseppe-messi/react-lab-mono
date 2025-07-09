import styles from "./LoadingSpinner.module.css";

type Size = "sm" | "md" | "lg";

interface LoadingSpinnerProps {
  size?: Size;
  color?: string;
}

const sizeMap: Record<Size, number> = {
  sm: 24,
  md: 36,
  lg: 60
};

export function LoadingSpinner({
  size = "md",
  color = "currentColor"
}: LoadingSpinnerProps) {
  return (
    <div className={styles.box}>
      <svg
        aria-label="Loading"
        height={sizeMap[size]}
        role="status"
        viewBox="0 0 24 24"
        width={sizeMap[size]}
      >
        <circle
          cx="12"
          cy="12"
          fill="none"
          r="10"
          stroke={color}
          strokeDasharray="31.4 31.4"
          strokeWidth="4"
        >
          <animateTransform
            attributeName="transform"
            dur="1s"
            from="0 12 12"
            repeatCount="indefinite"
            to="360 12 12"
            type="rotate"
          />
        </circle>
      </svg>
    </div>
  );
}
