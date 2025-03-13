import { render, screen } from '@testing-library/react';
import Loader from '../Loader';

jest.mock('next/image', () => {
  const MockedImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  );
  MockedImage.displayName = 'MockedImage';
  return MockedImage;
});

test('renders Loader component', () => {
  render(<Loader />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});
