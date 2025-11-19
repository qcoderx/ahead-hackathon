import React, { useState } from "react";
import styles from "../styles/OTCSafetyCheckForm.module.css";

const OTCSafetyCheckForm = ({ onCheck }) => {
  const [drugName, setDrugName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCheck(drugName);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={drugName}
        onChange={(e) => setDrugName(e.target.value)}
        placeholder="Enter OTC Drug Name"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Check Safety
      </button>
    </form>
  );
};

export default OTCSafetyCheckForm;
