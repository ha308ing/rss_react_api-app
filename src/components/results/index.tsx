import { IAppStateExtended } from '@/app';
import { pokemonApi } from '@/services';
import React from 'react';
import { PokemonCard } from '@/components';
import { IPokemon } from '@/types';

type ResultsProps = Pick<
  IAppStateExtended,
  'changeStatus' | 'searchQuery' | 'status'
>;

type ResultsState = { result: IPokemon | (IPokemon | null)[] | null };

export class Results extends React.PureComponent<ResultsProps, ResultsState> {
  controllerRef = React.createRef<AbortController>();

  state: ResultsState = {
    result: null,
  };

  loadResults = async () => {
    this.props.changeStatus('loading');

    const data = await pokemonApi.getPokemon(
      this.props.searchQuery,
      this.controllerRef?.current?.signal
    );

    this.setState({ result: data });

    if (data === null || (Array.isArray(data) && data.length === 0)) {
      this.props.changeStatus('error');
    } else {
      this.props.changeStatus(null);
    }
  };

  componentDidMount(): void {
    this.controllerRef.current = new AbortController();
  }

  componentDidUpdate(prevProps: ResultsProps) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.loadResults();
    }
  }

  componentWillUnmount(): void {
    this.controllerRef?.current?.abort();
  }

  render() {
    if (this.props.status === 'loading')
      return (
        <img
          src="./loader.gif"
          alt="Loading pokemons"
          className="text-center mt-[5rem] max-w-[15rem] mx-auto"
        />
      );

    if (this.props.status === 'error' || this.state.result == null)
      return <h1 className="text-center mt-[5rem]">Failed to get pokemon</h1>;

    const cards = Array.isArray(this.state.result) ? (
      this.state.result.map(
        (pokemon) =>
          pokemon && <PokemonCard key={pokemon.id} pokemon={pokemon} />
      )
    ) : (
      <PokemonCard pokemon={this.state.result} />
    );
    return (
      <main className="flex flex-wrap basis-md justify-stretch items-stretch">
        {cards}
      </main>
    );
  }
}
