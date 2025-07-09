import React from "react";
import { Button } from "../Button";
import { Typography } from "../Typography";
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
      <Button onClick={handleBackHome} text="Go Back Home" />
    </div>
  );
};
