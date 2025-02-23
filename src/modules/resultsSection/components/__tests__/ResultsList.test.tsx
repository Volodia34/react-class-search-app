import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ResultsList from '../ResultsList';
import store from '@modules/core/states/store.ts';

const dummyData = [
  { number: '001', name: 'Bulbasaur', imageSrc: 'bulbasaur.png' },
  { number: '002', name: 'Ivysaur', imageSrc: 'ivysaur.png' },
];

test('renders the specified number of cards', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ResultsList loading={false} error={null} data={dummyData} />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument();
  expect(screen.getByText(/Ivysaur/i)).toBeInTheDocument();
});
