import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@modules/core/states/store.ts';
import { addItem, removeItem } from '@modules/core/states/selectedItemsSlice';
import styles from './Card.module.css';
import { useRouter } from 'next/navigation';
import { Item } from '../../../../types/Item.ts';

type CardProps = Item;

const Card: React.FC<CardProps> = ({ number, imageSrc, name }) => {
  const formattedNumber = `#${number.padStart(3, '0')}`;
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );
  const isSelected = selectedItems.some((item) => item.id === number);
  const currentSearchTerm =
    new URLSearchParams(window.location.search).get('searchTerm') || '';
  const currentPage =
    new URLSearchParams(window.location.search).get('page') || '1';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(
      `/details/${number}?searchTerm=${currentSearchTerm}&page=${currentPage}`
    );
  };

  const handleCheckboxChange = () => {
    if (isSelected) {
      dispatch(removeItem(number));
    } else {
      dispatch(addItem({ id: number, name, description: '', detailsUrl: '' }));
    }
  };

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick}
    >
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()}
          className={styles.checkbox}
        />
      </label>
      <p className={styles.number}>{formattedNumber}</p>
      <img className={styles.cardImg} src={imageSrc} alt={name} />
      <h2 className={styles.name}>{name}</h2>
    </div>
  );
};

export default Card;
