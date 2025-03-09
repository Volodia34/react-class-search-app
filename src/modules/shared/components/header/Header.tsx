import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import logo from '../../../../assets/Pokeball.svg';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image className={styles.img} src={logo} alt="Logo" height={50} />
      </Link>
      <Link href="/" className={styles.link}>
        <h1>Pokédex</h1>
      </Link>
    </header>
  );
};

export default Header;
