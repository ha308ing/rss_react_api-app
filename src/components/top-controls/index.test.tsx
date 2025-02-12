import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppContext, IAppContext } from '@/contexts';
import { TopControls } from '.';
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

describe('test top controls component', () => {
  test('search button should reflect loading state', () => {
    customRender(<TopControls />, {
      providerProps: { ...providerProps, status: 'loading' },
    });

    const button = screen.getByTestId('search-button');

    expect(button).toHaveTextContent(/loading/i);
  });

  test('button click should set search query', async () => {
    const user = userEvent.setup();
    customRender(<TopControls />, {
      providerProps,
    });

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    await user.click(input);
    await user.keyboard('pika');
    await user.click(button);

    expect(providerProps.setSearchQuery).toBeCalledWith('pika');
  });
});
