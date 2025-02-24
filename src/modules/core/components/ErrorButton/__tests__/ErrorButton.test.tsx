import { render, screen, fireEvent } from '@testing-library/react';
import ErrorButton from '../ErrorButton';

test('renders ErrorButton component', () => {
  render(<ErrorButton />);
  expect(screen.getByText(/Error Button/i)).toBeInTheDocument();
});

test('throws error on button click', () => {
  const consoleError = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});
  render(<ErrorButton />);
  expect(() => {
    fireEvent.click(screen.getByText(/Error Button/i));
  }).toThrow('Something went wrong');
  consoleError.mockRestore();
});
