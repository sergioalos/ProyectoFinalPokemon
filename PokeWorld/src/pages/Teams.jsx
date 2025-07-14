import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserTeams, createTeam, deleteTeam } from '../api/teams';
import '../assets/css/Teams.css'; // (opcional si decides usar CSS externo)

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const userTeams = await getUserTeams();
        setTeams(userTeams);
      } catch (err) {
        console.error('Error al obtener equipos:', err);
        setError('No se pudieron cargar los equipos.');
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleCreateTeam = async () => {
    if (!teamName.trim()) return;

    try {
      const newTeam = await createTeam({ name: teamName });
      setTeams((prev) => [...prev, newTeam]);
      setTeamName('');
    } catch (err) {
      console.error('Error al crear equipo:', err);
      setError('No se pudo crear el equipo.');
    }
  };

  const handleDeleteTeam = async (teamId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este equipo?')) return;

    try {
      await deleteTeam(teamId);
      setTeams((prev) => prev.filter((team) => team.id !== teamId));
    } catch (err) {
      console.error('Error al eliminar equipo:', err);
      setError('No se pudo eliminar el equipo.');
    }
  };

  const handleTeamClick = (e, teamId) => {
    // Evita que el clic en la cruz dispare navegación
    if (e.target.classList.contains('delete-button')) return;
    navigate(`/equipos/${teamId}`);
  };

  return (
    <div className="teams-container">
      <h2>Mis Equipos</h2>

      {error && <p className="error">{error}</p>}

      <div className="create-team">
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Nombre del equipo"
        />
        <button onClick={handleCreateTeam}>Crear equipo</button>
      </div>

      {loading ? (
        <p>Cargando equipos...</p>
      ) : teams.length > 0 ? (
        teams.map((team) => (
          <div
            key={team.id}
            className="team-card"
            onClick={(e) => handleTeamClick(e, team.id)}
          >
            <span className="team-name">{team.name}</span>
            <button
              className="delete-button"
              onClick={() => handleDeleteTeam(team.id)}
              title="Eliminar equipo"
            >
              ❌
            </button>
          </div>
        ))
      ) : (
        <p>No tienes equipos aún.</p>
      )}
    </div>
  );
};

export default Teams;
