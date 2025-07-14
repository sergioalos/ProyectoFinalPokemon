// src/pages/BattleInProgress.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getBattleById, startBattleRound } from '../api/battles';
import { getTeamById } from '../api/teams';
import '../assets/css/BattleInProgress.css';

const getImageUrlById = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

const BattleInProgress = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const team1Id = searchParams.get('p1');
  const team2Id = searchParams.get('p2');

  const [battle, setBattle] = useState(null);
  const [team1Pokemons, setTeam1Pokemons] = useState([]);
  const [team2Pokemons, setTeam2Pokemons] = useState([]);
  const [status, setStatus] = useState('Aún no ha comenzado ninguna ronda.');
  const [loading, setLoading] = useState(true);
  const [roundNumber, setRoundNumber] = useState(1);
  const [roundHistory, setRoundHistory] = useState([]);
  const [animatedRound, setAnimatedRound] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [battleData, team1, team2] = await Promise.all([
          getBattleById(id),
          getTeamById(team1Id),
          getTeamById(team2Id)
        ]);

        setBattle(battleData);
        setTeam1Pokemons(team1.pokemons || []);
        setTeam2Pokemons(team2.pokemons || []);
      } catch (error) {
        console.error('Error al cargar datos de la batalla o equipos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, team1Id, team2Id]);

  const handleNextRound = async () => {
    if (!battle || team1Pokemons.length === 0 || team2Pokemons.length === 0) {
      setStatus('La batalla ha terminado.');
      return;
    }

    const team1Pokemon = team1Pokemons[0];
    const team2Pokemon = team2Pokemons[0];

    try {
      const result = await startBattleRound(
        battle.battle.id,
        team1Pokemon.id,
        team2Pokemon.id
      );

      const winningTeamId = result.round.winning_team_id;
      const winner = winningTeamId === parseInt(team1Id) ? 'Tu equipo' : 'Rival';

      const roundEntry = {
        number: roundNumber,
        team1Name: team1Pokemon.name,
        team2Name: team2Pokemon.name,
        winner
      };

      setRoundHistory((prev) => [...prev, roundEntry]);
      setAnimatedRound(roundNumber);

      // Eliminar Pokémon perdedor
      if (winningTeamId === parseInt(team1Id)) {
        setTeam2Pokemons((prev) => prev.filter((p) => p.id !== team2Pokemon.id));
      } else {
        setTeam1Pokemons((prev) => prev.filter((p) => p.id !== team1Pokemon.id));
      }

      // Final
      if (
        (winningTeamId === parseInt(team1Id) && team2Pokemons.length <= 1) ||
        (winningTeamId === parseInt(team2Id) && team1Pokemons.length <= 1)
      ) {
        setStatus(`🔥 Batalla terminada. Ganador: ${winner}`);
      } else {
        setStatus(`✅ Ganador de la ronda ${roundNumber}: ${winner}`);
        setRoundNumber((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Error al lanzar ronda:', error);
      setStatus('❌ Error al lanzar ronda');
    }
  };

  if (loading) return <p style={{ padding: '2rem', textAlign: 'center' }}>Cargando batalla y equipos...</p>;
  if (!battle) return <p style={{ padding: '2rem', textAlign: 'center' }}>No se encontró la batalla.</p>;

  const current1 = team1Pokemons[0];
  const current2 = team2Pokemons[0];

  return (
    <div className="battle-progress-container">
      <h2 className="battle-progress-title">⚔️ Batalla #{battle.id}</h2>

      {status.includes('terminada') ? (
        <h1 className="battle-status">{status}</h1>
      ) : (
        <>
          <div className="battle-pokemons-row">
            {current1 && (
              <div className="battle-pokemon-card">
                <div className="battle-pokemon-label">Tu Pokémon</div>
                <img
                  src={getImageUrlById(current1.id)}
                  alt={current1.name}
                  className="battle-pokemon-img"
                />
                <div className="battle-pokemon-name">{current1.name}</div>
              </div>
            )}
            {current2 && (
              <div className="battle-pokemon-card">
                <div className="battle-pokemon-label">Pokémon rival</div>
                <img
                  src={getImageUrlById(current2.id)}
                  alt={current2.name}
                  className="battle-pokemon-img"
                />
                <div className="battle-pokemon-name">{current2.name}</div>
              </div>
            )}
          </div>

          <div className={`battle-status${status.includes('Error') ? ' error' : ''}`}>{status}</div>
          <button
            onClick={handleNextRound}
            disabled={!current1 || !current2}
            className="battle-next-btn"
          >
            Lanzar siguiente ronda
          </button>
        </>
      )}

      {roundHistory.length > 0 && (
        <div className="battle-history-section">
          <h3 className="battle-history-title">📜 Historial de rondas</h3>
          <div className="battle-history-list">
            {roundHistory.map((round, idx) => {
              const isWin = round.winner === 'Tu equipo';
              const isLose = round.winner === 'Rival';
              const animate = round.number === animatedRound;
              return (
                <div
                  key={round.number}
                  className={
                    "battle-history-item" +
                    (isWin ? " win" : isLose ? " lose" : "") +
                    (animate ? (isWin ? " animate-win" : isLose ? " animate-lose" : "") : "")
                  }
                  onAnimationEnd={() => {
                    if (animate) setAnimatedRound(null);
                  }}
                >
                  <strong>Ronda {round.number}:</strong> {round.team1Name} vs {round.team2Name} → Ganador: {round.winner}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BattleInProgress;
