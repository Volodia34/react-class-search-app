import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchForm from '@modules/topControls/components/SearchForm';

describe('SearchForm component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('clicking the Search button saves the entered value to localStorage', () => {
    const onSearchMock = jest.fn();
    render(
      <MemoryRouter>
        <SearchForm onSearch={onSearchMock} />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('test query');
    expect(localStorage.getItem('searchTerm')).toBe('test query');
  });

  test('retrieves the value from localStorage upon mounting', () => {
    localStorage.setItem('searchTerm', 'stored query');
    render(
      <MemoryRouter>
        <SearchForm onSearch={() => {}} />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveValue('stored query');
  });
});
