import { render, screen } from '@testing-library/react';
import NotFound from '../NotFound';

test('renders NotFound component', () => {
  render(<NotFound />);
  expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
});
