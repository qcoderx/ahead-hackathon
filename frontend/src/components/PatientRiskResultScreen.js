import React from "react";
import styles from "../styles/PatientRiskResultScreen.module.css";

const PatientRiskResultScreen = ({ result }) => {
  if (!result) return null;

  const isSafe = result.riskLevel === "safe";

  return (
    <div
      className={`${styles.container} ${isSafe ? styles.safe : styles.warning}`}
    >
      <h2>{isSafe ? "Safe to Use" : "Consult Your Doctor"}</h2>
      <p>{result.message}</p>
    </div>
  );
};

export default PatientRiskResultScreen;
