import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import Pagination from '@modules/resultsSection/components/Pagination.tsx';

interface TestComponentProps {
  totalPages: number;
  currentPage: number;
}

const TestComponent: React.FC<TestComponentProps> = ({
  totalPages,
  currentPage,
}) => {
  const location = useLocation();
  return (
    <div>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
      <div data-testid="location-display">{location.search}</div>
    </div>
  );
};

describe('Pagination Component', () => {
  test('updates URL query parameter when page changes', () => {
    const totalPages = 5;
    const currentPage = 1;
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <TestComponent totalPages={totalPages} currentPage={currentPage} />
      </MemoryRouter>
    );

    // Знаходимо кнопку для сторінки "2" (якщо вона не disabled)
    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);

    // Після кліку у URL має бути "page=2"
    const locationDisplay = screen.getByTestId('location-display');
    expect(locationDisplay.textContent).toContain('page=2');
  });
});
