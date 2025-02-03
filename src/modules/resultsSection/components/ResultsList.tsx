import { Component } from 'react';
import styles from './ResultsList.module.css';
import Card from '@modules/shared/components/card/Card.tsx';
import Loader from '@modules/core/components/Loader/Loader.tsx';

interface Item {
  number: string;
  imageSrc: string;
  name: string;
}

interface ResultsListProps {
  loading: boolean;
  error: string | null;
  data: Item[];
}

class ResultsList extends Component<ResultsListProps> {
  render() {
    const { loading, error, data } = this.props;

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
          data.map((item, index) => (
            <Card
              key={index}
              number={item.number}
              imageSrc={item.imageSrc}
              name={item.name}
            />
          ))
        ) : (
          <p>No results</p>
        )}
      </div>
    );
  }
}

export default ResultsList;
