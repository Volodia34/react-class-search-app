import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from '@modules/shared/components/card/Card.tsx';

// Mock useNavigate and useSearchParams from react-router-dom
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useSearchParams: () => [new URLSearchParams('page=1'), jest.fn()],
}));

describe('Card Component', () => {
  const dummyCard = {
    name: 'Pikachu',
    number: '025',
    imageSrc: 'pikachu.png',
  };

  beforeEach(() => {
    mockedUsedNavigate.mockReset();
  });

  test('renders relevant card data', () => {
    render(
      <MemoryRouter>
        <Card {...dummyCard} />
      </MemoryRouter>
    );

    expect(
      screen.getByText(`#${dummyCard.number.padStart(3, '0')}`)
    ).toBeInTheDocument();
    expect(screen.getByText(dummyCard.name)).toBeInTheDocument();
    const image = screen.getByAltText(dummyCard.name);
    expect(image).toHaveAttribute('src', dummyCard.imageSrc);
  });

  test('clicking on a card navigates to the detailed card route', () => {
    render(
      <MemoryRouter>
        <Card {...dummyCard} />
      </MemoryRouter>
    );
    const cardElement = screen.getByText(dummyCard.name);
    fireEvent.click(cardElement);
    expect(mockedUsedNavigate).toHaveBeenCalledWith(
      `/details/${dummyCard.number}?page=1`
    );
  });
});
