import React from 'react';
import styles from './Card.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Item } from '../../../../types/Item.ts';

type CardProps = Item;

const Card: React.FC<CardProps> = ({ number, imageSrc, name }) => {
  const formattedNumber = `#${number.padStart(3, '0')}`;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/details/${number}?page=${searchParams.get('page') || '1'}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <p className={styles.number}>{formattedNumber}</p>
      <img className={styles.cardImg} src={imageSrc} alt={name} />
      <h2 className={styles.name}>{name}</h2>
    </div>
  );
};

export default Card;
