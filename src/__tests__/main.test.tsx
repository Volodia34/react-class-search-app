import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../App';
import store from '@modules/core/states/store.ts';

test('renders main entry point', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText(/Pokédex/i)).toBeInTheDocument();
});
