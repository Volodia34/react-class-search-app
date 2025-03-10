'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@modules/shared/components/header/Header';
import SearchForm from '@modules/topControls/components/SearchForm';
import ResultsList from '@modules/resultsSection/components/ResultsList';
import Pagination from '@modules/resultsSection/components/Pagination';
import ErrorButton from '@modules/core/components/ErrorButton/ErrorButton';
import Flyout from '@modules/shared/components/flyout/Flyout';
import { useFetchItemsQuery } from '@modules/core/states/apiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import ThemeSwitcher from '@modules/core/components/ThemeSwitcher/ThemeSwitcher';
import { useSelector } from 'react-redux';
import { RootState } from '@modules/core/states/store';

const ITEMS_PER_PAGE = 18;

const Home: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('searchTerm') || '';
  const sort = searchParams.get('sort') || 'number';
  const page = searchParams.get('page') || '1';
  const currentPage = parseInt(page, 10);

  const {
    data = { items: [], totalCount: 0 },
    error,
    isLoading,
  } = useFetchItemsQuery({
    searchTerm,
    sort,
    limit: ITEMS_PER_PAGE,
    offset: (currentPage - 1) * ITEMS_PER_PAGE,
  });

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

  const handleSearch = (query: string) => {
    router.push(`/?searchTerm=${query}&page=1`);
  };

  const totalPages = Math.ceil(data.totalCount / ITEMS_PER_PAGE);
  const paginatedData = data.items;

  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  return (
    <div>
      <Header />
      <ThemeSwitcher />
      <SearchForm onSearch={handleSearch} />
      <div className="app-layout" style={{ display: 'flex' }}>
        <div className="left-section" style={{ flex: 1 }}>
          <ResultsList
            loading={isLoading}
            error={getErrorMessage(error)}
            data={paginatedData}
          />
          {data.totalCount > ITEMS_PER_PAGE && (
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          )}
        </div>
      </div>
      {selectedItems.length > 0 && <Flyout />}
      <ErrorButton />
    </div>
  );
};

export default Home;
