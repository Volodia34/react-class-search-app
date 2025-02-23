import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

const ThrowError = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary Component', () => {
  let consoleError: jest.SpyInstance;

  beforeAll(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleError.mockRestore();
  });

  test('catches errors and displays fallback UI', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
