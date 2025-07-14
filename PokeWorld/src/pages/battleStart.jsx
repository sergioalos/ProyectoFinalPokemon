// src/pages/BattleStart.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserTeams, getTeamById } from '../api/teams';
import { startBattle } from '../api/battles';
import '../assets/css/BattleStart.css';


const BattleStart = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [battleResult, setBattleResult] = useState(null);
  const navigate = useNavigate(); // ✅ hook para redirigir

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const userTeams = await getUserTeams();
        const teamsWithPokemons = await Promise.all(
          userTeams.map(async (team) => {
            const teamDetail = await getTeamById(team.id); // como en TeamDetail
            return { ...team, pokemons: teamDetail.pokemons };
          })
        );
        setTeams(teamsWithPokemons);
      } catch (error) {
        console.error('Error al cargar los equipos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleStartBattle = async () => {
    if (!selectedTeamId) return;

    try {
      const response = await startBattle(selectedTeamId); // POST a /battles
      const battle = response.battle;
      setBattleResult(battle);
      navigate(`/battles/${battle.id}?p1=${battle.team1_id}&p2=${battle.team2_id}`);
    } catch (error) {
      console.error('Error al iniciar batalla:', error);
      alert('Error al iniciar batalla');
    }
  };

  if (loading) return <p>Cargando equipos...</p>;

  return (
    <div className="battle-start-container">
      <h2 className="battle-title">Iniciar una Batalla</h2>

      <div className="teams-list-battle">
        {teams.map((team) => (
          <label
            key={team.id}
            className={`battle-team-card${selectedTeamId === team.id ? ' selected' : ''}`}
          >
            <input
              type="radio"
              name="selectedTeam"
              value={team.id}
              onChange={() => setSelectedTeamId(team.id)}
              checked={selectedTeamId === team.id}
              className="battle-radio"
            />
            <div className="battle-team-info">
              <span className="battle-team-name">{team.name}</span>
              <div className="battle-pokemons">
                {Array.isArray(team.pokemons) && team.pokemons.length > 0 ? (
                  team.pokemons.map((p) => (
                    <img
                      key={p.id}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                      alt={p.name}
                      title={p.name}
                      className="battle-poke-img"
                    />
                  ))
                ) : (
                  <span className="battle-no-pokemons">Sin Pokémon</span>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>

      <button
        className="battle-start-btn"
        onClick={handleStartBattle}
        disabled={!selectedTeamId}
      >
        Iniciar Batalla
      </button>

      {battleResult && (
        <div className="battle-result">
          <h3>¡Batalla iniciada!</h3>
          <p>ID de la batalla: {battleResult.id}</p>
          <p>Estado: {battleResult.status}</p>
        </div>
      )}
    </div>
  );
};

export default BattleStart;
