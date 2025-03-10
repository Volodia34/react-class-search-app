import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SortDropdown from '../SortDropdown';

describe('SortDropdown Component', () => {
  test('renders SortDropdown component', () => {
    render(
      <MemoryRouter>
        <SortDropdown />
      </MemoryRouter>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('opens dropdown menu on button click', () => {
    render(
      <MemoryRouter>
        <SortDropdown />
      </MemoryRouter>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText(/Sort by:/i)).toBeInTheDocument();
  });

  test('closes dropdown menu when clicking outside', () => {
    render(
      <MemoryRouter>
        <SortDropdown />
      </MemoryRouter>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText(/Sort by:/i)).toBeInTheDocument();
    fireEvent.mouseDown(document);
    expect(screen.queryByText(/Sort by:/i)).not.toBeInTheDocument();
  });

  test('changes sort option on selection', () => {
    render(
      <MemoryRouter>
        <SortDropdown />
      </MemoryRouter>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const nameOption = screen.getByLabelText('Name');
    fireEvent.click(nameOption);
    expect(screen.queryByText(/Sort by:/i)).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByLabelText('Name')).toBeChecked();
  });
});
