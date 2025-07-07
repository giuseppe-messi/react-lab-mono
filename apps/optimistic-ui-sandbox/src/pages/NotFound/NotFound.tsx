import React from "react";
import styles from "./NotFound.module.css";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2 className="titleH2">We can’t find that page!</h2>

      <Button text="Go Back Home" onClick={() => navigate("/")} />
    </div>
  );
};

export default NotFound;
