import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearItems } from '@modules/core/states/selectedItemsSlice';
import { RootState } from '@modules/core/states/store.ts';
import styles from './Flyout.module.css';

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  const handleUnselectAll = () => {
    dispatch(clearItems());
  };

  const handleDownload = () => {
    const csvContent = selectedItems
      .map(
        (item) =>
          `${item.id},${item.name},${item.description},${item.detailsUrl}`
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedItems.length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.flyout}>
      <p>{selectedItems.length} items are selected</p>
      <button className={styles.button} onClick={handleUnselectAll}>
        Unselect all
      </button>
      <button className={styles.button} onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};

export default Flyout;
