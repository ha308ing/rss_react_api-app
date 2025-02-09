import { Results, TopControls, ErrorButton, Pagination } from '@/components';
import { usePokemons, useLocalStorage } from '@/hooks';
import { AppContext } from '@/contexts';
import './app.css';

export const App = () => {
  const [searchQuery, setSearchQuery] = useLocalStorage();
  const [pokemons, status, page, nextHandler, prevHandler] =
    usePokemons(searchQuery);

  return (
    <AppContext.Provider
      value={{ pokemons, status, searchQuery, setSearchQuery }}
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
    </AppContext.Provider>
  );
};
