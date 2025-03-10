import { render, screen } from '@testing-library/react';
import DetailPage from '../[id]/page';
import { ThemeProvider } from '@modules/core/context/ThemeContext';

describe('DetailPage Component', () => {
  test('renders without crashing', () => {
    render(
      <ThemeProvider>
        <DetailPage />
      </ThemeProvider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
