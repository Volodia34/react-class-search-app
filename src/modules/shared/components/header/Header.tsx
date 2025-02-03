import { Component } from 'react';
import styles from './Heade.module.css';
import logo from '../../../../assets/Pokeball.svg';
class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <img src={logo} alt="" />
        <h1>Pokédex</h1>
      </header>
    );
  }
}

export default Header;
