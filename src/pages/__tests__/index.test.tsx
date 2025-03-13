import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import Home from '../index';
import store from '../../modules/core/states/store';
import { ThemeProvider } from '@modules/core/context/ThemeContext';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />;
  },
}));

describe('Home Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { searchTerm: '', sort: 'number', page: '1' },
      push: jest.fn(),
    });
  });

  test('renders Header, ThemeSwitcher, and SearchForm components', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Pokédex')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Theme:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  test('displays error message', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </Provider>
    );

    const errorMessage = 'Error: 404';
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('handles search', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: { searchTerm: '', sort: 'number', page: '1' },
      push: pushMock,
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Search'), {
      target: { value: 'test' },
    });
    fireEvent.click(screen.getByText('Search'));

    expect(pushMock).toHaveBeenCalledWith('/?searchTerm=test&page=1');
  });
});
