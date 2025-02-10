import React from 'react';
import styles from './Header.module.css';
import logo from '../../../../assets/Pokeball.svg';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" />
      <h1>Pokédex</h1>
    </header>
  );
};

export default Header;
