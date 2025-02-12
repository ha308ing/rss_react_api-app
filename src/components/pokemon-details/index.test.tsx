import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppContext, IAppContext } from '@/contexts';
import { PokemonDetails } from '.';
import { usePokemons } from '@/hooks';
import userEvent from '@testing-library/user-event';

const mocks = vi.hoisted(() => {
  return {
    usePokemons: vi.fn((): Array<{ id: number; types: unknown[] } | null> => {
      const pokemons = { id: 1, types: [] };
      return [pokemons];
    }),
  };
});

vi.mock('../../hooks/usePokemons', () => {
  return {
    usePokemons: mocks.usePokemons,
  };
});

const customRender = (
  ui: React.ReactNode,
  { providerProps, ...renderOptions }: { providerProps: IAppContext }
) => {
  return render(
    <AppContext.Provider value={{ ...providerProps }}>
      {ui}
    </AppContext.Provider>,
    renderOptions
  );
};

const providerProps: IAppContext = {
  pokemonDetails: 'pika',
  closePokemonDetails: vi.fn(),
  pokemons: null,
  status: null,
  searchQuery: '',
  setSearchQuery: vi.fn(),
  setPokemonDetails: vi.fn(),
};

describe('tests pokemon details component', () => {
  test('should call pokemons hook with selected pokemon', () => {
    customRender(<PokemonDetails />, { providerProps });

    expect(usePokemons).toBeCalledWith('pika');
  });

  test('should close on close button click', async () => {
    const user = userEvent.setup();
    customRender(<PokemonDetails />, { providerProps });

    const button = screen.getByText(/close/i);

    await user.click(button);

    expect(providerProps.closePokemonDetails).toBeCalled();
  });

  test('should close on click outside of details', async () => {
    const user = userEvent.setup();
    customRender(<PokemonDetails />, { providerProps });

    await user.click(document.body);

    expect(providerProps.closePokemonDetails).toBeCalled();
  });

  test('should render message if no pokemon is set', async () => {
    mocks.usePokemons.mockReturnValue([null]);

    customRender(<PokemonDetails />, {
      providerProps: { ...providerProps, pokemonDetails: null },
    });

    const message = screen.getByText(/where is pokemon/i);

    expect(message).toBeInTheDocument();
  });
});
