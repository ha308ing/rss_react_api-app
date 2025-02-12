import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppContext, IAppContext } from '@/contexts';
import { Results } from '.';
import userEvent from '@testing-library/user-event';

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

const pokemons = [
  {
    id: 1,
    types: [],
    name: 'pika',
    height: 0,
    weight: 0,
    image: '',
    stats: [],
  },
  {
    id: 2,
    types: [],
    name: 'bulba',
    height: 0,
    weight: 0,
    image: '',
    stats: [],
  },
];

describe('test api results component', () => {
  test("should render loader, when status 'loading'", () => {
    customRender(<Results />, {
      providerProps: { ...providerProps, status: 'loading' },
    });

    const loader = screen.getByAltText(/loading pokemons/i);

    expect(loader).toBeInTheDocument();
  });

  test("should render error message, when status 'error'", () => {
    customRender(<Results />, {
      providerProps: { ...providerProps, status: 'error' },
    });

    const message = screen.getByText(/failed to get pokemon/i);

    expect(message).toBeInTheDocument();
  });

  test('should render multiple results', () => {
    customRender(<Results />, {
      providerProps: {
        ...providerProps,
        status: 'success',
        pokemons,
      },
    });

    const pokemon1 = screen.getByText('#1');
    const pokemon2 = screen.getByText('#2');

    expect(pokemon1).toBeInTheDocument();
    expect(pokemon2).toBeInTheDocument();
  });

  test('should render single result', () => {
    customRender(<Results />, {
      providerProps: {
        ...providerProps,
        status: 'success',
        pokemons: pokemons[0],
      },
    });

    expect(document.querySelector('.flex')?.childNodes.length).toBe(1);
  });

  test('should not render without results', () => {
    customRender(<Results />, {
      providerProps: {
        ...providerProps,
        status: 'success',
        pokemons: null,
      },
    });

    expect(document.body.firstChild?.hasChildNodes()).toBeFalsy();
  });

  test('should set pokemon name on card click', async () => {
    const user = userEvent.setup();
    customRender(<Results />, {
      providerProps: {
        ...providerProps,
        status: 'success',
        pokemons,
      },
    });

    const pokemon2 = screen.getByText('#2');

    await user.click(pokemon2);

    expect(providerProps.setPokemonDetails).toBeCalledWith('bulba');
  });
});
