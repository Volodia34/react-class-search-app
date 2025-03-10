import React from 'react';
import styles from './Loader.module.css';
import Pokeball from '../../../../assets/Pokeball.svg';

const Loader: React.FC = () => (
  <div className={styles.loaderContainer}>
    <img
      src={Pokeball}
      className={styles.spinner}
      alt="Loading"
      role="status"
    />
    <p className={styles.loadingText}>Loading...</p>
  </div>
);

export default Loader;
