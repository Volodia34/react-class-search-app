import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../NotFound';

test('renders NotFound component', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );
  expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  expect(
    screen.getByText(/The page you requested does not exist./i)
  ).toBeInTheDocument();
});
