import { useState, useEffect } from 'react';

export const useStoredSearchQuery = (
  key: string = 'searchTerm'
): [string, (newQuery: string) => void] => {
  const [query, setQuery] = useState<string>(
    () => localStorage.getItem(key) || ''
  );

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored && stored !== query) {
      setQuery(stored);
    }
  }, [key]);

  const updateQuery = (newQuery: string) => {
    localStorage.setItem(key, newQuery);
    setQuery(newQuery);
  };

  return [query, updateQuery];
};
