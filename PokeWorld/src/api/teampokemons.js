import axios from 'axios';
import { authHeader } from '../utils/auth'; // ajusta la ruta si es necesario

export const assignPokemonsToTeam = async (teamId, pokemonIds) => {
  const response = await axios.post(
    `http://localhost:3000/team-pokemons/${teamId}`,
    { pokemonIds },
    { headers: authHeader() }
  );
  return response.data;
};
