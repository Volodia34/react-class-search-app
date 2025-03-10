import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import ResultsList from '../ResultsList';
import Pagination from '../Pagination';
import { ThemeProvider } from '@modules/core/context/ThemeContext';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />;
  },
}));

describe('ResultsList Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
      push: jest.fn(),
      pathname: '/',
    });
  });

  test('renders ResultsList component', () => {
    render(
      <ThemeProvider>
        <ResultsList loading={false} error={null} data={[]} />
      </ThemeProvider>
    );
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  test('updates URL query parameter when page changes', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
      push,
      pathname: '/',
    });

    render(
      <ThemeProvider>
        <Pagination totalPages={3} currentPage={1} />
      </ThemeProvider>
    );

    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);
    expect(push).toHaveBeenCalledWith(`?page=2`);
  });
});
