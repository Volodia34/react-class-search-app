import { render, screen } from '@testing-library/react';
import Loader from '../Loader';

test('renders Loader component', () => {
  render(<Loader />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});
