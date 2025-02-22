import { render, screen } from '@testing-library/react';
import ErrorButton from '../ErrorButton';

test('renders ErrorButton component', () => {
  render(<ErrorButton />);
  expect(screen.getByText(/Error Button/i)).toBeInTheDocument();
});
