import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@modules/core/context/ThemeContext';
import Home from '../page';
import store from '@modules/core/states/store';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('Home Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(''),
    });
  });

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByText('No results')).toBeInTheDocument();
  });
});
