import React from 'react';
import styles from './SearchForm.module.css';
import { trimInput } from '@modules/core/utils/stringHelpers';
import { useStoredSearchQuery } from '@modules/core/hooks/useStoredSearchQuery.ts';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useStoredSearchQuery('searchTerm');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    const trimmedQuery = trimInput(query);
    onSearch(trimmedQuery);
  };

  return (
    <div className={styles.searchForm}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search"
        className={styles.searchInput}
      />
      <button onClick={handleSearchClick} className={styles.searchButton}>
        Search
      </button>
    </div>
  );
};

export default SearchForm;
