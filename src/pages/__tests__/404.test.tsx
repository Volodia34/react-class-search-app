import { render, screen } from '@testing-library/react';
import NotFoundPage from '../404';

describe('404 Page', () => {
  test('renders 404 error message', () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
