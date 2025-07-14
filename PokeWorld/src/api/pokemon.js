import api from './api';

export const getAllPokemons = async () => {
  try {
    const response = await api.get('/pokemons');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los Pokémon:', error);
    throw error;
  }
};
export const getPokemonTypes = async (pokemonId) => {
  try {
    const response = await api.get(`/pokemons/${pokemonId}/types`);
    return response.data.types.map(t => t.name); // solo devolvemos los nombres
  } catch (error) {
    console.error(`Error al obtener los tipos del Pokémon ${pokemonId}:`, error);
    return [];
  }
};
