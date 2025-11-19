import React from "react";
import styles from "../styles/DigitalAntenatalCard.module.css";

const DigitalAntenatalCard = ({ patientData }) => {
  if (!patientData)
    return <div className={styles.empty}>No patient data available</div>;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>Antenatal Card</h2>
        <span className={styles.id}>ID: {patientData.id}</span>
      </div>
      <div className={styles.section}>
        <h3>Personal Information</h3>
        <p>Name: {patientData.name}</p>
        <p>Age: {patientData.age}</p>
        <p>Blood Group: {patientData.bloodGroup}</p>
      </div>
      <div className={styles.section}>
        <h3>Medical History</h3>
        <ul>
          {patientData.history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DigitalAntenatalCard;
