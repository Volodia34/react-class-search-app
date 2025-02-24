import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Flyout from '../Flyout';
import store from '@modules/core/states/store.ts';
import { addItem } from '@modules/core/states/selectedItemsSlice';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve([]),
    headers: new Headers(),
    redirected: false,
    statusText: 'OK',
    type: 'basic',
    url: '',
    clone: jest.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    text: jest.fn(),
  } as Response)
);

global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

test('renders Flyout component', () => {
  render(
    <Provider store={store}>
      <Flyout />
    </Provider>
  );
  expect(screen.getByText(/items are selected/i)).toBeInTheDocument();
});

test('unselects all items', () => {
  store.dispatch(
    addItem({
      id: '1',
      name: 'Item 1',
      description: 'Desc 1',
      detailsUrl: 'url1',
    })
  );

  render(
    <Provider store={store}>
      <Flyout />
    </Provider>
  );

  fireEvent.click(screen.getByText(/Unselect all/i));
  expect(screen.getByText(/0 items are selected/i)).toBeInTheDocument();
});

test('downloads selected items as CSV', () => {
  store.dispatch(
    addItem({
      id: '1',
      name: 'Item 1',
      description: 'Desc 1',
      detailsUrl: 'url1',
    })
  );

  render(
    <Provider store={store}>
      <Flyout />
    </Provider>
  );

  const downloadButton = screen.getByText(/Download/i);
  const createElementSpy = jest.spyOn(document, 'createElement');

  fireEvent.click(downloadButton);

  expect(createElementSpy).toHaveBeenCalledWith('a');

  createElementSpy.mockRestore();
});
