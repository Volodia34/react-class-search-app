import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ResultsList from '../ResultsList';
import store from '@modules/core/states/store';

const dummyData = [
  { number: '001', name: 'Bulbasaur', imageSrc: 'bulbasaur.png' },
  { number: '002', name: 'Ivysaur', imageSrc: 'ivysaur.png' },
];

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    push: jest.fn(),
  }),
}));

test('renders the specified number of cards', () => {
  render(
    <Provider store={store}>
      <ResultsList loading={false} error={null} data={dummyData} />
    </Provider>
  );
  expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument();
  expect(screen.getByText(/Ivysaur/i)).toBeInTheDocument();
});
