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

    if (data === null) {
      this.props.changeStatus('error');
    } else {
      this.props.changeStatus(null);
    }
  };

  componentDidMount(): void {
    this.controllerRef.current = new AbortController();
    this.loadResults();
  }

  componentDidUpdate(prevProps: ResultsProps, prevState: ResultsState) {
    if (
      this.props.searchQuery !== prevProps.searchQuery ||
      (this.state.result != null &&
        prevState.result != null &&
        Object.keys(this.state.result).length !==
          Object.keys(prevState.result).length)
    ) {
      this.loadResults();
    }
  }

  componentWillUnmount(): void {
    this.controllerRef?.current?.abort();
  }

  render() {
    if (this.props.status === 'error') return <h1>Error</h1>;
    if (this.props.status === 'loading') return <h1>Loading</h1>;
    if (this.state.result == null) return null;

    const cards = Array.isArray(this.state.result) ? (
      this.state.result.map(
        (pokemon) =>
          pokemon && <PokemonCard key={pokemon.id} pokemon={pokemon} />
      )
    ) : (
      <PokemonCard pokemon={this.state.result} />
    );
    return cards;
  }
}
