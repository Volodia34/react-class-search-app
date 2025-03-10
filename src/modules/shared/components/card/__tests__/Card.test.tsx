import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Card from '../Card';
import { useRouter } from 'next/navigation';

const mockStore = configureStore([]);
const mockedPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
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
    mockedPush.mockReset();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockedPush,
      query: { searchTerm: '', page: '1' },
    });
  });

  test('renders relevant card data', () => {
    render(
      <Provider store={store}>
        <Card {...dummyCard} />
      </Provider>
    );

    expect(screen.getByText('#025')).toBeInTheDocument();
    expect(screen.getByAltText(dummyCard.name)).toBeInTheDocument();
    expect(screen.getByText(dummyCard.name)).toBeInTheDocument();
  });

  test('navigates to details page on card click', () => {
    render(
      <Provider store={store}>
        <Card {...dummyCard} />
      </Provider>
    );

    fireEvent.click(screen.getByText(dummyCard.name));
    expect(mockedPush).toHaveBeenCalledWith(
      `/details/${dummyCard.number}?searchTerm=&page=1`
    );
  });

  test('toggles selection state on checkbox change', () => {
    render(
      <Provider store={store}>
        <Card {...dummyCard} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
