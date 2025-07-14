import { render, screen } from '@testing-library/react';
import PokemonList from '../PokemonList';
import { BrowserRouter } from 'react-router-dom';

describe('PokemonList page', () => {
  it('renderiza el título de la lista de Pokémon', async () => {
    render(
      <BrowserRouter>
        <PokemonList />
      </BrowserRouter>
    );

    expect(await screen.findByText(/lista de pokémon/i)).toBeInTheDocument();
  });
});