// src/pages/Ranking.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import '../assets/css/Ranking.css';

const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await api.get('/stats/ranking');
        setRanking(res.data);
      } catch (err) {
        setError('Error al cargar el ranking');
        console.error(err);
      }
    };

    fetchRanking();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="ranking-container">
      <h2>🏆 Ranking Global</h2>
      <table className="ranking-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Ganadas</th>
            <th>Jugadas</th>
            <th>Ratio</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((user, index) => {
            const ratio = user.battles_played
              ? ((user.battles_won / user.battles_played) * 100).toFixed(1) + '%'
              : '0%';

            return (
              <tr key={user.user_id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.battles_won}</td>
                <td>{user.battles_played}</td>
                <td>{ratio}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;
