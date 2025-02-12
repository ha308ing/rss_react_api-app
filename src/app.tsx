import { Results, TopControls, ErrorButton, Pagination } from '@/components';
import { usePokemons, useLocalStorage, useDetails } from '@/hooks';
import { AppContext } from '@/contexts';
import './app.css';
import { Outlet } from 'react-router';

export const App = () => {
  const [searchQuery, setSearchQuery] = useLocalStorage();
  const [pokemons, status, page, nextHandler, prevHandler] =
    usePokemons(searchQuery);
  const { pokemonDetails, setPokemonDetails, closePokemonDetails } =
    useDetails();

  return (
    <AppContext.Provider
      value={{
        pokemons,
        status,
        searchQuery,
        setSearchQuery,
        setPokemonDetails,
        pokemonDetails,
        closePokemonDetails,
      }}
    >
      <section className="max-w-xl mx-auto">
        <h1 className="text-[3rem] m-4 font-bold text-center">API App</h1>
        <ErrorButton />
        <TopControls />
        {searchQuery == null ||
          (searchQuery == '' && (
            <Pagination
              prevHandler={prevHandler}
              nextHandler={nextHandler}
              page={page}
            />
          ))}
        <Results />
      </section>
      <Outlet />
    </AppContext.Provider>
  );
};
