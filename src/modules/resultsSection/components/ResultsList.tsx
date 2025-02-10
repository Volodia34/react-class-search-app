import React from 'react';
import styles from './ResultsList.module.css';
import Card from '@modules/shared/components/card/Card';
import Loader from '@modules/core/components/Loader/Loader';
import { Item } from '../../../types/Item.ts';

interface ResultsListProps {
  loading: boolean;
  error: string | null;
  data: Item[];
}

const ResultsList: React.FC<ResultsListProps> = ({ loading, error, data }) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3>An error occurred while loading the data</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.resultsContainer}>
      {data.length > 0 ? (
        data.map((item, index) => <Card key={index} {...item} />)
      ) : (
        <p>No results</p>
      )}
    </div>
  );
};

export default ResultsList;
