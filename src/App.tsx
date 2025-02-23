import React from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
  useMatch,
} from 'react-router-dom';
import Header from '@modules/shared/components/header/Header';
import SearchForm from '@modules/topControls/components/SearchForm';
import ResultsList from '@modules/resultsSection/components/ResultsList';
import Pagination from '@modules/resultsSection/components/Pagination';
import './App.css';
import ErrorButton from '@modules/core/components/ErrorButton/ErrorButton.tsx';
import Flyout from '@modules/shared/components/flyout/Flyout.tsx';
import { useFetchItemsQuery } from '@modules/core/states/apiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

const ITEMS_PER_PAGE = 18;

const App: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const searchTerm = searchParams.get('searchTerm') || '';
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const { data = [], error, isLoading } = useFetchItemsQuery(searchTerm);

  const getErrorMessage = (
    error: FetchBaseQueryError | SerializedError | undefined
  ): string => {
    if (!error) return '';
    if ('status' in error) {
      return `Error: ${error.status}`;
    } else if ('message' in error) {
      return error.message || 'An unknown error occurred';
    }
    return 'An unknown error occurred';
  };

  const handleListClick = () => {
    const searchTerm = searchParams.get('searchTerm');
    const pageParam = searchParams.get('page');

    if (location.pathname.includes('details') && searchTerm && pageParam) {
      navigate(`/?searchTerm=${searchTerm}&page=${pageParam}`);
    } else if (location.pathname.includes('details')) {
      navigate(`/?page=${currentPage}`);
    }
  };

  const totalPages = Array.isArray(data)
    ? Math.ceil(data.length / ITEMS_PER_PAGE)
    : 0;
  const paginatedData = Array.isArray(data)
    ? data.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    : [];

  const detailMatch = useMatch('/details/:id');

  const handleSearch = (query: string) => {
    navigate(`/?searchTerm=${query}&page=1`);
  };

  return (
    <div>
      <Header />
      <SearchForm onSearch={handleSearch} />
      <div className="app-layout" style={{ display: 'flex' }}>
        <div
          className="left-section"
          style={{ flex: 1 }}
          onClick={handleListClick}
        >
          <ResultsList
            loading={isLoading}
            error={getErrorMessage(error)}
            data={paginatedData}
          />
          {data.length > ITEMS_PER_PAGE && (
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          )}
        </div>
        {detailMatch && (
          <div
            className="right-section"
            style={{ width: '600px', borderLeft: '1px solid #ccc' }}
          >
            <Outlet />
          </div>
        )}
      </div>
      <Flyout />
      <ErrorButton />
    </div>
  );
};

export default App;
