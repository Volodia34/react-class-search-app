import { render, screen, fireEvent } from '@testing-library/react';
import SortDropdown from '../SortDropdown';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />;
  },
}));

describe('SortDropdown Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('number'),
    });
  });

  test('updates URL query parameter when sort option changes', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push,
    });

    render(<SortDropdown />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByLabelText('Name'));
    expect(push).toHaveBeenCalledWith('?sort=name');
  });
});
