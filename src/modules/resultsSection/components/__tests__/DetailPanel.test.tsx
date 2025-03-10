import { render, screen, waitFor } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import DetailPanel from '../DetailPanel';
import { ThemeProvider } from '@modules/core/context/ThemeContext';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />;
  },
}));

describe('DetailPanel Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      back: jest.fn(),
    });
    (usePathname as jest.Mock).mockReturnValue('/details/123');
  });

  test('renders Pokémon data', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 123,
        name: 'Scyther',
        weight: 560,
        height: 150,
        types: [{ type: { name: 'bug' } }],
        abilities: [{ ability: { name: 'Swarm' } }],
        stats: [{ base_stat: 70, stat: { name: 'speed' } }],
        sprites: {
          other: {
            'official-artwork': {
              front_default: 'https://example.com/scyther.png',
            },
          },
        },
      }),
    });

    render(
      <ThemeProvider>
        <DetailPanel />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Scyther')).toBeInTheDocument();
      expect(screen.getByText('#123')).toBeInTheDocument();
      expect(screen.getByText('56 kg')).toBeInTheDocument();
      expect(screen.getByText('1.5 m')).toBeInTheDocument();
      expect(screen.getByText('Swarm')).toBeInTheDocument();
      expect(screen.getByText('SPEED')).toBeInTheDocument();
    });
  });
});
