import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './SortDropdown.module.css';
import tag from '../../../../assets/tag.svg';
import text from '../../../../assets/text.svg';
import Image from 'next/image';

const SortDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedSort = searchParams.get('sort') || 'number';

  const handleSortChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('sort', value);
    router.push(`?${newSearchParams.toString()}`);
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
        <Image
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
