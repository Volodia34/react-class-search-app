import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailPanel from '@modules/resultsSection/components/DetailPanel.tsx';

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        id: 123,
        name: 'scyther',
        weight: 560,
        height: 150,
        types: [{ type: { name: 'bug' } }, { type: { name: 'flying' } }],
        abilities: [
          { ability: { name: 'swarm' } },
          { ability: { name: 'technician' } },
        ],
        stats: [{ base_stat: 70, stat: { name: 'speed' } }],
        sprites: {
          other: {
            'official-artwork': {
              front_default:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/123.png',
            },
          },
        },
      }),
  })
);

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

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByText('scyther')).toBeInTheDocument();
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
