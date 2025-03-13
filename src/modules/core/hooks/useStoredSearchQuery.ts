import { useState, useEffect } from 'react';

export const useStoredSearchQuery = (
  key: string = 'searchTerm'
): [string, (newQuery: string) => void] => {
  const isBrowser = typeof window !== 'undefined';
  const [query, setQuery] = useState<string>(
    () => (isBrowser ? localStorage.getItem(key) : '') || ''
  );

  useEffect(() => {
    if (isBrowser) {
      const stored = localStorage.getItem(key);
      if (stored && stored !== query) {
        setQuery(stored);
      }
    }
  }, [key, isBrowser]);

  const updateQuery = (newQuery: string) => {
    if (isBrowser) {
      localStorage.setItem(key, newQuery);
    }
    setQuery(newQuery);
  };

  return [query, updateQuery];
};
