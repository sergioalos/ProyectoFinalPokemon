import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getMyStats } from '../api/battles'; // asegúrate de importar correctamente
import '../assets/css/BattleHistory.css';

const BattleHistory = () => {
  const [battles, setBattles] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem('token');
        const [battlesRes, statsRes] = await Promise.all([
          axios.get('http://localhost:3000/battles/my-history', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:3000/stats/my-stats', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setBattles(battlesRes.data);
        setStats(statsRes.data);
      } catch (err) {
        setError('Error al cargar los datos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <p>Cargando historial...</p>;
  if (error) return <p>{error}</p>;
  if (battles.length === 0) return <p>No has participado en ningún combate todavía.</p>;

  return (
    <div className="battle-history-container">
      {stats && (
        <div className="stats-card">
          <h3>Estadísticas</h3>
          <p className="stats-won">🏆 Ganadas: {stats.battles_won}</p>
          <p className="stats-lost">❌ Perdidas: {stats.battles_lost}</p>
        </div>
      )}

      <h2>Historial de combates</h2>
      <ul className="battle-list">
        {battles.map((battle) => {
          const userTeamId = battle.team1?.id
            ? battle.team1?.id
            : battle.team2?.id;
            debugger;
          const userWon = battle.winner_team?.id === userTeamId;
          const battleClass = userWon ? 'battle-win' : 'battle-loss';

          const date = new Date(battle.createdAt).toLocaleDateString();
          const winnerName = battle.winner_team?.name || 'Sin ganador';

          return (
            <li key={battle.id} className={`battle-item ${battleClass}`}>
              <p><strong>Batalla #{battle.id}</strong> - {date}</p>
              <p><strong>Equipo 1:</strong> {battle.team1?.name || 'Desconocido'}</p>
              <p><strong>Equipo 2:</strong> {battle.team2?.name || 'Desconocido'}</p>
              <p><strong>Ganador:</strong> {winnerName}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BattleHistory;