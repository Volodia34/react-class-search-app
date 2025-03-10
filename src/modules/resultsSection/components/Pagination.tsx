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
  const maxPageButtons = 5;

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    navigate(`/?${searchParams.toString()}`);
  };

  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor(maxPageButtons / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage - half < 1) {
      end = Math.min(totalPages, end + (half - currentPage + 1));
    }
    if (currentPage + half > totalPages) {
      start = Math.max(1, start - (currentPage + half - totalPages));
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationWrapper}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          Previous
        </button>
        {getPageNumbers().map((page) => (
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
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
