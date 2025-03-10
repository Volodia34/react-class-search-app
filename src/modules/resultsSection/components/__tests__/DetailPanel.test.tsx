import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import DetailPanel from '@modules/resultsSection/components/DetailPanel';
import store from '@modules/core/states/store';

describe('DetailPanel Component', () => {
  const detailId = '123';

  test('displays detailed card data after loading and closes on button click', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/', `/details/${detailId}?page=1`]}>
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/details/:id" element={<DetailPanel />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText('scyther')).toBeInTheDocument();
      expect(screen.getByText('#123')).toBeInTheDocument();
    });

    const closeButton = screen.getByText('←');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.getByText('Home Page')).toBeInTheDocument();
    });
  });
});
