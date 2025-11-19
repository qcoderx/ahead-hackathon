import React from "react";
import styles from "../styles/RiskResultScreen.module.css";

const RiskResultScreen = ({ result }) => {
  if (!result) return null;

  return (
    <div className={`${styles.container} ${styles[result.riskLevel]}`}>
      <h2>Risk Level: {result.riskLevel}</h2>
      <p>{result.message}</p>
      {result.alternatives && (
        <div className={styles.alternatives}>
          <h3>Alternatives:</h3>
          <ul>
            {result.alternatives.map((alt, index) => (
              <li key={index}>{alt}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RiskResultScreen;
