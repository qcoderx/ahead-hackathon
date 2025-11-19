import React, { useState } from "react";
import styles from "../styles/MedicationCheckForm.module.css";

const MedicationCheckForm = ({ onCheck }) => {
  const [medication, setMedication] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCheck(medication);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={medication}
        onChange={(e) => setMedication(e.target.value)}
        placeholder="Enter Medication Name or Scan Barcode"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Check Safety
      </button>
    </form>
  );
};

export default MedicationCheckForm;
