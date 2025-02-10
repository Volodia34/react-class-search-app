import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Item } from '../../../../types/Item.ts';
import ResultsList from '@modules/resultsSection/components/ResultsList.tsx';

describe('ResultsList Component', () => {
  const dummyData: Item[] = [
    { name: 'Bulbasaur', number: '001', imageSrc: 'bulbasaur.png' },
    { name: 'Charmander', number: '004', imageSrc: 'charmander.png' },
    { name: 'Squirtle', number: '007', imageSrc: 'squirtle.png' },
  ];

  test('renders the specified number of cards', () => {
    render(
      <MemoryRouter>
        <ResultsList loading={false} error={null} data={dummyData} />
      </MemoryRouter>
    );
    dummyData.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  test('displays an appropriate message if no cards are present', () => {
    render(
      <MemoryRouter>
        <ResultsList loading={false} error={null} data={[]} />
      </MemoryRouter>
    );
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });
});
