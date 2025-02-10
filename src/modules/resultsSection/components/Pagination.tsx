import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
    <div style={{ marginTop: '16px' }}>
      {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
        <button
          key={page}
          disabled={page === currentPage}
          onClick={() => handlePageChange(page)}
          style={{ margin: '0 4px' }}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
