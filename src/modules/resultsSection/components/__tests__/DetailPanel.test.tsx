import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailPanel from '@modules/resultsSection/components/DetailPanel.tsx';

jest.useFakeTimers();

describe('DetailPanel Component', () => {
  const detailId = '123';

  test('displays a loading indicator while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={[`/details/${detailId}?page=1`]}>
        <Routes>
          <Route path="/details/:id" element={<DetailPanel />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByText(`Pokemon ${detailId}`)).toBeInTheDocument();
    });
  });

  test('displays detailed card data after loading and closes on button click', async () => {
    render(
      <MemoryRouter initialEntries={[`/details/${detailId}?page=1`]}>
        <Routes>
          <Route path="/details/:id" element={<DetailPanel />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByText(`Pokemon ${detailId}`)).toBeInTheDocument();
      expect(
        screen.getByText(`Detailed description for Pokemon ${detailId}.`)
      ).toBeInTheDocument();
    });

    const closeButton = screen.getByText(/закрити/i);
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.getByText(/home page/i)).toBeInTheDocument();
    });
  });
});
