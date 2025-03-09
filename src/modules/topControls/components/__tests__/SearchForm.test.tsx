import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '@modules/topControls/components/SearchForm';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    push: jest.fn(),
  }),
}));

jest.mock('next/image', () => {
  const MockedImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} width="16" height="16" />
  );
  MockedImage.displayName = 'MockedImage';
  return MockedImage;
});

describe('SearchForm component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('clicking the Search button saves the entered value to localStorage', () => {
    const onSearchMock = jest.fn();
    render(<SearchForm onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('test query');
    expect(localStorage.getItem('searchTerm')).toBe('test query');
  });

  test('retrieves the value from localStorage upon mounting', () => {
    localStorage.setItem('searchTerm', 'stored query');
    render(<SearchForm onSearch={() => {}} />);
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveValue('stored query');
  });
});
