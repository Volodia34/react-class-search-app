import { Component } from 'react';
import styles from './Card.module.css';

class Card extends Component {
  render() {
    return (
      <div className={styles.card}>
        <p className={styles.number}>#999</p>
        <img className={styles.cardImg} src="" alt="" />
        <h2 className={styles.name}>Pokémon Name</h2>
      </div>
    );
  }
}

export default Card;
