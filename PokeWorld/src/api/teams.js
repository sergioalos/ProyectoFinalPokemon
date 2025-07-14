import api from './api';

// Obtener los equipos del usuario autenticado
export const getUserTeams = async () => {
  const response = await api.get('/teams/my');
  return response.data;
};

// Crear un nuevo equipo para el usuario
export const createTeam = async ({ name }) => {
  const response = await api.post('/teams', { name });
  return response.data.team; // <-- devolvemos solo el equipo
};
// Obtener Pokémon de un equipo por ID
export const getTeamPokemons = async (teamId) => {
  const response = await api.get(`/team-pokemons/${teamId}`);
  return response.data;
};

export const getTeamById = async (id) => {
  try {
    const response = await api.get(`/team-pokemons/${id}`);
    console.log('Equipo obtenido:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener equipo por ID:', error);
    throw error;
  }
};

export const deleteTeam = async (teamId) => {
  const response = await api.delete(`/teams/${teamId}`);
  return response.data;
};