import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@modules/core/context/ThemeContext.tsx';
import ThemeSwitcher from '@modules/core/components/ThemeSwitcher/ThemeSwitcher.tsx';

test('renders ThemeSwitcher component', () => {
  render(
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  );

  expect(screen.getByLabelText(/Select Theme/)).toBeInTheDocument();
});

test('changes theme on selection', () => {
  render(
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  );

  const select = screen.getByLabelText(/Select Theme/);
  fireEvent.change(select, { target: { value: 'dark' } });

  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
});
