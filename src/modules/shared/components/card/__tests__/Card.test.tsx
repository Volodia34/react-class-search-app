// src/modules/shared/components/card/__tests__/Card.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Card from '../Card';

const mockStore = configureStore([]);
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  // Повертаємо параметри з searchTerm як порожній рядок
  useSearchParams: () => [new URLSearchParams('searchTerm=&page=1'), jest.fn()],
}));

describe('Card Component', () => {
  const dummyCard = {
    name: 'Pikachu',
    number: '025',
    imageSrc: 'pikachu.png',
  };

  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      selectedItems: { items: [] },
    });
    store.dispatch = jest.fn();
    mockedUsedNavigate.mockReset();
  });

  test('renders relevant card data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card {...dummyCard} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('#025')).toBeInTheDocument();
    expect(screen.getByAltText(dummyCard.name)).toBeInTheDocument();
    expect(screen.getByText(dummyCard.name)).toBeInTheDocument();
  });

  test('navigates to details page on card click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card {...dummyCard} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(dummyCard.name));
    expect(mockedUsedNavigate).toHaveBeenCalledWith(
      `/details/${dummyCard.number}?searchTerm=&page=1`
    );
  });

  test('toggles selection state on checkbox change', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card {...dummyCard} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
