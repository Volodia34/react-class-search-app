import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../../../assets/Pokeball.svg';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <Link to="/">
        <h1>Pokédex</h1>
      </Link>
    </header>
  );
};

export default Header;
