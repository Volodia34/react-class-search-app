import { Component } from 'react';
import styles from './Search.module.css';

class Search extends Component {
  render() {
    return (
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>Search</button>
      </div>
    );
  }
}

export default Search;
