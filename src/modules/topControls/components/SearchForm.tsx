// src/modules/topControls/components/SearchForm.tsx
import { Component, ChangeEvent } from 'react';
import styles from './SearchForm.module.css';
import { trimInput } from '@modules/core/ src/modules/core/utils/stringHelpers.ts';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

interface SearchFormState {
  query: string;
}

class SearchForm extends Component<SearchFormProps, SearchFormState> {
  constructor(props: SearchFormProps) {
    super(props);
    const savedQuery = localStorage.getItem('searchTerm') || '';
    this.state = {
      query: savedQuery,
    };
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  handleSearchClick = () => {
    const trimmedQuery = trimInput(this.state.query);
    localStorage.setItem('searchTerm', trimmedQuery);
    this.props.onSearch(trimmedQuery);
  };

  render() {
    return (
      <div className={styles.searchForm}>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleInputChange}
          placeholder="Search"
          className={styles.searchInput}
        />
        <button
          onClick={this.handleSearchClick}
          className={styles.searchButton}
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchForm;
