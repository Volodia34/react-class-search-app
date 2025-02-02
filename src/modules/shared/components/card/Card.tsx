import { Component } from 'react';
import styles from './Card.module.css';
import { Item } from '../../../../types/Item';

class Card extends Component<Item> {
  render() {
    const { number, imageSrc, name } = this.props;

    const formattedNumber = `#${String(number).padStart(3, '0')}`;

    return (
      <div className={styles.card}>
        <p className={styles.number}>{formattedNumber}</p>
        <img className={styles.cardImg} src={imageSrc} alt={name} />
        <h2 className={styles.name}>{name}</h2>
      </div>
    );
  }
}

export default Card;
