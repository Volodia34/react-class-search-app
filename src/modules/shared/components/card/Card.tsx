import { Component } from 'react';
import styles from './Card.module.css';

interface CardProps {
  number: string;
  imageSrc: string;
  name: string;
}

class Card extends Component<CardProps> {
  render() {
    const { number, imageSrc, name } = this.props;
    return (
      <div className={styles.card}>
        <p className={styles.number}>{number}</p>
        <img className={styles.cardImg} src={imageSrc} alt={name} />
        <h2 className={styles.name}>{name}</h2>
      </div>
    );
  }
}

export default Card;
