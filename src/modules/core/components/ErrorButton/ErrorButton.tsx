import React, { useState } from 'react';
import styles from './ErrorButton.module.css';

const ErrorButton: React.FC = () => {
  const [throwError, setThrowError] = useState(false);

  const handleClick = () => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('Something went wrong');
  }

  return (
    <button className={styles.errorButton} onClick={handleClick}>
      Error Button
    </button>
  );
};

export default ErrorButton;
