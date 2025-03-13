import { render, screen } from '@testing-library/react';
import {
  ThemeProvider,
  useTheme,
} from '@modules/core/context/ThemeContext.tsx';

const TestComponent = () => {
  const { theme } = useTheme();
  return <div>{theme}</div>;
};

test('provides theme context', () => {
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );

  expect(screen.getByText('light')).toBeInTheDocument();
});
