import { render } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

test('renders ErrorBoundary component', () => {
  const { container } = render(
    <ErrorBoundary>
      <div>Child Component</div>
    </ErrorBoundary>
  );
  expect(container).toHaveTextContent('Child Component');
});
