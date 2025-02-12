import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PokemonCard } from '.';
import userEvent from '@testing-library/user-event';

describe('pokemon card', () => {
  const pokemon = {
    id: 1,
    name: 'pika',
    image: 'pikaImg',
    types: ['electricity', 'bug'],
    height: 2,
    weight: 3,
    stats: [],
  };

  test('should render pokemon id', () => {
    render(<PokemonCard pokemon={pokemon} />);

    const idText = screen.getByText('#' + 1);

    expect(idText).toBeInTheDocument();
  });

  test('should render pokemon image', () => {
    render(<PokemonCard pokemon={pokemon} />);

    const image = screen.getByAltText('pika');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'pikaImg');
  });

  test('should render pokemon stats as string', () => {
    render(<PokemonCard pokemon={pokemon} />);

    const types = screen.getByText(/electricity, bug/i);

    expect(types).toBeInTheDocument();
  });

  test('should trigger clickHandler', async () => {
    const user = userEvent.setup();
    const clickHandler = vi.fn();
    render(<PokemonCard pokemon={pokemon} clickHandler={clickHandler} />);

    const types = screen.getByText(/electricity, bug/i);
    const image = screen.getByAltText('pika');

    await user.click(types);
    await user.click(image);

    expect(clickHandler).toBeCalledTimes(2);
  });
});
