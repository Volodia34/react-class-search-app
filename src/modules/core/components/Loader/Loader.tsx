import React from 'react';
import styles from './Loader.module.css';

const Loader: React.FC = () => (
  <div className={styles.loaderContainer}>
    <div className={styles.spinner}></div>
    <p className={styles.loadingText}>Loading...</p>
  </div>
);

export default Loader;
