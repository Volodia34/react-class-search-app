import React from 'react';
import styles from './Loader.module.css';
import Pokeball from '../../../../assets/Pokeball.svg';
import Image from 'next/image';

const Loader: React.FC = () => (
  <div className={styles.loaderContainer}>
    <Image
      src={Pokeball}
      className={styles.spinner}
      alt="Loading"
      role="status"
    />
    <p className={styles.loadingText}>Loading...</p>
  </div>
);

export default Loader;
