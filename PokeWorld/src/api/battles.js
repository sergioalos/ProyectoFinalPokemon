import api from './api';

export const startBattle = async (team1_id) => {
  const response = await api.post('/battles', { team1_id });
  return response.data;
};

export const getBattleById = async (id) => {
  const response = await api.get(`/battles/${id}`);
  return response.data;
};

export const startBattleRound = async (battleId, team1PokemonId, team2PokemonId) => {
  const response = await api.post(`/battles/${battleId}/rounds`, {
  battle_id: battleId,
  team1_pokemon_id: team1PokemonId,
  team2_pokemon_id: team2PokemonId
});
  return response.data;
};

export const getUserBattles = async () => {
  const response = await api.get('/battles/my-history');
  return response.data;
};
export async function getMyStats() {
  const res = await fetch('http://localhost:3000/stats/my-stats', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!res.ok) throw new Error('Error al obtener estadísticas');
  return await res.json();
}

