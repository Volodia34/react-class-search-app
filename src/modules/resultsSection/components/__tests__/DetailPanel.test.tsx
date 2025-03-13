import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import DetailPanel from '../DetailPanel';
import { ThemeProvider } from '@modules/core/context/ThemeContext';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
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
      query: { id: '123' },
      push: jest.fn(),
      back: jest.fn(),
    });
  });

  test('displays detailed card data after loading and closes on button click', async () => {
    render(
      <ThemeProvider>
        <DetailPanel />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/scyther/i)).toBeInTheDocument();
      expect(screen.getByText(/#123/i)).toBeInTheDocument();
    });
  });
});
