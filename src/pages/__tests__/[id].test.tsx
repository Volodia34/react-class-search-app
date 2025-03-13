import { render, screen } from '@testing-library/react';
import DetailPage from '../details/[id]';

const MockDetailPanel = () => <div>DetailPanel</div>;
MockDetailPanel.displayName = 'MockDetailPanel';

jest.mock(
  '@modules/resultsSection/components/DetailPanel',
  () => MockDetailPanel
);

describe('Detail Page', () => {
  test('renders DetailPanel component', () => {
    render(<DetailPage />);
    expect(screen.getByText('DetailPanel')).toBeInTheDocument();
  });
});
