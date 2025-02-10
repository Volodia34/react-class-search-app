import React, { useEffect, useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
  useMatch,
} from 'react-router-dom';
import Header from '@modules/shared/components/header/Header';
import SearchForm from '@modules/topControls/components/SearchForm';
import { fetchItems } from '@modules/core/lib/apiService';
import ResultsList from '@modules/resultsSection/components/ResultsList';
import Pagination from '@modules/resultsSection/components/Pagination';
import { Item } from './types/Item.ts';
import './App.css';

const ITEMS_PER_PAGE = 18;

const App: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Отримуємо поточну сторінку з query-параметрів (за замовчуванням 1)
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const performSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      // Імітуємо затримку для демонстрації завантаження
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const items: Item[] = await fetchItems(query);
      setData(items);
    } catch (err: unknown) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchTerm') || '';
    performSearch(savedQuery);
  }, []);

  // Якщо користувач клацає на лівій секції (ResultsList), то закриваємо праву секцію
  const handleListClick = () => {
    if (location.pathname.includes('details')) {
      navigate(`/?page=${currentPage}`);
    }
  };

  // Обчислюємо пагінацію
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Використовуємо useMatch для перевірки, чи відкритий маршрут деталей
  const detailMatch = useMatch('/details/:id');

  return (
    <div>
      <Header />
      <SearchForm onSearch={performSearch} />
      <div className="app-layout" style={{ display: 'flex' }}>
        {/* Ліва секція з результатами */}
        <div
          className="left-section"
          style={{ flex: 1 }}
          onClick={handleListClick}
        >
          <ResultsList loading={loading} error={error} data={paginatedData} />
          {data.length > ITEMS_PER_PAGE && (
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          )}
        </div>
        {/* Права секція з деталями відображається лише коли маршрут відповідає /details/:id */}
        {detailMatch && (
          <div
            className="right-section"
            style={{ width: '400px', borderLeft: '1px solid #ccc' }}
          >
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
