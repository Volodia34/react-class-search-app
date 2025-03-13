import { render, screen } from '@testing-library/react';
import Header from '../Header';

jest.mock('next/image', () => {
  const MockedImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  );
  MockedImage.displayName = 'MockedImage';
  return MockedImage;
});

test('renders Header component', () => {
  render(<Header />);
  expect(screen.getByText(/Pokédex/i)).toBeInTheDocument();
});
