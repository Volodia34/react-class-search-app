import { render, screen } from '@testing-library/react';
import NotFound from '@modules/core/components/NotFound/NotFound';

describe('NotFound component', () => {
  test('renders 404 message', () => {
    render(<NotFound />);
    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/The page you requested does not exist./i)
    ).toBeInTheDocument();
  });
});
