import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../App';
import store from '@modules/core/states/store';
import { ThemeProvider } from '@modules/core/context/ThemeContext.tsx';

jest.mock('@modules/core/states/apiSlice', () => ({
  __esModule: true,
  api: {
    reducerPath: 'api',
    reducer: jest.fn().mockReturnValue({}),
    middleware: jest.fn().mockReturnValue([]),
    useFetchItemsQuery: jest.fn((searchTerm) => {
      if (searchTerm === 'Pikachu') {
        return {
          data: [{ number: '025', name: 'Pikachu', imageSrc: 'pikachu.png' }],
          error: null,
          isLoading: false,
        };
      } else {
        return {
          data: Array.from({ length: 20 }, (_, i) => ({
            number: String(i + 1).padStart(3, '0'),
            name: `Pokemon ${i + 1}`,
            imageSrc: `pokemon${i + 1}.png`,
          })),
          error: null,
          isLoading: false,
        };
      }
    }),
  },
}));

jest.mock('@reduxjs/toolkit/query', () => ({
  ...jest.requireActual('@reduxjs/toolkit/query'),
  setupListeners: jest.fn(),
}));

test('renders App component', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  });
  expect(screen.getByText(/Pokédex/i)).toBeInTheDocument();
});

test('handles search', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  });
  const searchInput = screen.getByPlaceholderText(/Search/i);
  fireEvent.change(searchInput, { target: { value: 'Pikachu' } });
  fireEvent.submit(searchInput);
  await waitFor(() => {
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
  });
});

test('renders pagination and flyout', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  });
  expect(screen.getByText(/items are selected/i)).toBeInTheDocument();
  expect(screen.getByText(/Next/i)).toBeInTheDocument();
});
