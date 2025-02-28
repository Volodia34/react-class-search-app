import React, { useState } from 'react';
import styles from './SearchForm.module.css';
import { trimInput } from '@modules/core/utils/stringHelpers';
import { useStoredSearchQuery } from '@modules/core/hooks/useStoredSearchQuery.ts';
import closeIcon from '../../../assets/close.svg';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useStoredSearchQuery('searchTerm');
  const [showClearButton, setShowClearButton] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowClearButton(e.target.value.length > 0);
  };

  const handleSearch = () => {
    const trimmedQuery = trimInput(query);
    onSearch(trimmedQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearInput = () => {
    setQuery('');
    setShowClearButton(false);
  };

  return (
    <div className={styles.searchForm}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search"
          className={styles.searchInput}
        />
        {showClearButton && (
          <button onClick={clearInput} className={styles.clearButton}>
            <img src={closeIcon} alt="Clear" />
          </button>
        )}
      </div>
      <button onClick={handleSearch} className={styles.searchButton}>
        Search
      </button>
    </div>
  );
};

export default SearchForm;
