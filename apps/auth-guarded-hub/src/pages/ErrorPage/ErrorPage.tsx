import React from "react";
import { Button, Typography } from "@react-lab-mono/ui";
import styles from "./ErrorPage.module.css";

type Props = {
  onClearError?: () => void;
};

export const ErrorPage: React.FC<Props> = ({ onClearError }) => {
  const handleBackHome = () => {
    onClearError?.();
    window.location.href = "/";
  };

  return (
    <div className={styles.container}>
      <Typography type="h2">Something is not right!</Typography>
      <Button fillMode="outline" onClick={handleBackHome} variant="white">
        Go Back Home
      </Button>
    </div>
  );
};
