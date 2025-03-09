import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Pagination Component', () => {
  test('updates URL query parameter when page changes', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
      push,
      pathname: '/',
    });

    render(<Pagination totalPages={3} currentPage={1} />);
    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);
    expect(push).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: '2' },
    });
  });
});
