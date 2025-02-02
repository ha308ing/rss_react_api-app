import { POKEMON_API } from '@/config';
import { IPokemon } from '@/types';
import React from 'react';

interface IPokemonCardProps {
  pokemon: IPokemon;
}

export class PokemonCard extends React.Component<IPokemonCardProps> {
  render() {
    const { id, types, image, name, height, weight } = this.props.pokemon;

    return (
      <article className="rounded-md border-2 border-red-50 p-4 shadow-md m-6 w-1/3 min-w-32 grow shrink-0">
        <div className="text-sm text-right">#{id}</div>
        <div>
          Name: <span className="font-bold">{name}</span>
        </div>
        <img src={image} alt={name} className="mx-auto" />
        <div>Type: {types}</div>
        <div>Height: {height}</div>
        <div>Weight: {weight}</div>
      </article>
    );
  }
}

export class PokemonCardFetch extends React.Component<Pick<IPokemon, 'id'>> {
  state = {
    data: null,
  };

  componentDidMount() {
    (async () => {
      this.setState({ data: 'loading' });
      const { id } = this.props;
      const response = await fetch(`${POKEMON_API.API_SEARCH_URL}/${id}`);
      if (!response.ok) return this.setState({ data: null });
      const data = await response.json();
      this.setState({ data });
    })();
  }

  render() {
    if (this.state.data === 'loading') return <i>Loading ${this.props.id}</i>;
    return this.state.data && <pre>{this.state.data}</pre>;
  }
}
