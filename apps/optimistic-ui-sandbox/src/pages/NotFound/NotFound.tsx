import React from "react";
import { Button } from "@react-lab-mono/ui";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2 className="titleH2">We can’t find that page!</h2>

      <Button onClick={() => navigate("/")} text="Go Back Home" />
    </div>
  );
};

export default NotFound;
