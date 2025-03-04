import React, { useState, useRef, useEffect } from 'react';
import styles from './SortDropdown.module.css';
import { useSearchParams } from 'react-router-dom';
import tag from '../../../../assets/tag.svg';
import text from '../../../../assets/text.svg';

const SortDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedSort = searchParams.get('sort') || 'number';

  const handleSortChange = (value: string) => {
    setSearchParams({ sort: value, searchTerm: '' });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.sortDropdown} ref={dropdownRef}>
      <button className={styles.sortButton} onClick={() => setIsOpen(!isOpen)}>
        <img
          className={styles.sortImg}
          src={selectedSort === 'number' ? tag : text}
          alt=""
        />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <p className={styles.title}>Sort by:</p>
          <div className={styles.options}>
            <label className={styles.option}>
              <input
                type="radio"
                name="sort"
                value="number"
                checked={selectedSort === 'number'}
                onChange={() => handleSortChange('number')}
              />
              Number
            </label>
            <label className={styles.option}>
              <input
                type="radio"
                name="sort"
                value="name"
                checked={selectedSort === 'name'}
                onChange={() => handleSortChange('name')}
              />
              Name
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
