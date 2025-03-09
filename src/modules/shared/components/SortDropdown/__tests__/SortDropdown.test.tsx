import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import SortDropdown from '../SortDropdown';
import { ThemeProvider } from '@modules/core/context/ThemeContext';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/image', () => {
  const MockedImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  );
  MockedImage.displayName = 'MockedImage';
  return MockedImage;
});

describe('SortDropdown Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { sort: 'number' },
      push: jest.fn(),
      pathname: '/',
    });
  });

  test('renders SortDropdown component', () => {
    render(
      <ThemeProvider>
        <SortDropdown />
      </ThemeProvider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('opens dropdown menu on button click', () => {
    render(
      <ThemeProvider>
        <SortDropdown />
      </ThemeProvider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText(/Sort by:/i)).toBeInTheDocument();
  });

  test('closes dropdown menu when clicking outside', () => {
    render(
      <ThemeProvider>
        <SortDropdown />
      </ThemeProvider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText(/Sort by:/i)).toBeInTheDocument();
    fireEvent.mouseDown(document);
    expect(screen.queryByText(/Sort by:/i)).not.toBeInTheDocument();
  });

  test('changes sort option on selection', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: { sort: 'number' },
      push,
      pathname: '/',
    });

    render(
      <ThemeProvider>
        <SortDropdown />
      </ThemeProvider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const nameOption = screen.getByLabelText('Name');
    fireEvent.click(nameOption);
    expect(push).toHaveBeenCalledWith({
      pathname: '/',
      query: { sort: 'name', searchTerm: '' },
    });
  });
});
