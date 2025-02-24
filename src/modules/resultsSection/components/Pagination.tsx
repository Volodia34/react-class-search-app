import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationWrapper}>
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
          <button
            key={page}
            disabled={page === currentPage}
            onClick={() => handlePageChange(page)}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.activePage : styles.inactivePage
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
