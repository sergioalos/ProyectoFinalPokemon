import React, { useEffect, useState } from 'react';
import { getAllPokemons, getPokemonTypes } from '../api/pokemon';
import '../assets/css/PokemonList.css';

const typeColors = {
  Planta: '#78C850',
  Veneno: '#A040A0',
  Fuego: '#F08030',
  Agua: '#6890F0',
  Bicho: '#A8B820',
  Normal: '#A8A878',
  Volador: '#A890F0',
  Eléctrico: '#F8D030',
  Tierra: '#E0C068',
  Hielo: '#98D8D8',
  Lucha: '#C03028',
  Psíquico: '#F85888',
  Roca: '#B8A038',
  Fantasma: '#705898',
  Dragón: '#7038F8',
  Siniestro: '#705848',
  Acero: '#B8B8D0',
  Hada: '#EE99AC'
};

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonsWithTypes = async () => {
      try {
        const data = await getAllPokemons();
        const enriched = await Promise.all(
          data.map(async (pokemon) => {
            const types = await getPokemonTypes(pokemon.id);
            return { ...pokemon, types };
          })
        );
        setPokemons(enriched);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonsWithTypes();
  }, []);

  if (loading) return <div className="loading">Cargando Pokémon...</div>;

  return (
    <div className="pokemon-list-container">
      <h2>Lista de Pokémon</h2>
      <div className="pokemon-grid">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
              className="pokemon-img"
            />
            <p className="pokemon-name">{pokemon.name}</p>
            <div className="pokemon-stats">
              ATK: {pokemon.attack} | DEF: {pokemon.defense}
            </div>
            <div className="pokemon-types">
              {pokemon.types?.map((type, index) => (
                <span
                  key={index}
                  className="pokemon-type"
                  style={{ backgroundColor: typeColors[type] || '#ccc' }}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
