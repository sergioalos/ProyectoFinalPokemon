import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllPokemons, getPokemonTypes } from '../api/pokemon';
import { getTeamById } from '../api/teams';
import { assignPokemonsToTeam } from '../api/teampokemons';
import '../assets/css/TeamPokemon.css';

const TeamDetail = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState({});
  const [allPokemons, setAllPokemons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  // ✅ Esta función ahora está dentro del componente, con acceso a setPokemonTypes
  const fetchTypes = async (pokemonList) => {
    const typesMap = {};
    for (const poke of pokemonList) {
      const types = await getPokemonTypes(poke.id);
      typesMap[poke.id] = types;
    }
    setPokemonTypes(typesMap);
  };

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await getTeamById(id);
        setTeam(response);
        setPokemons(response.pokemons);
        await fetchTypes(response.pokemons);
      } catch (error) {
        console.error('Error al obtener el equipo:', error);
      }
    };

    const fetchAllPokemons = async () => {
      try {
        const response = await getAllPokemons();
        setAllPokemons(response);
      } catch (error) {
        console.error('Error al obtener los Pokémon:', error);
      }
    };

    fetchTeam();
    fetchAllPokemons();
  }, [id]);

  const handleAddPokemon = async (pokemon) => {
    if (pokemons.length >= 4) return; // Ya lo tienes, pero así es más robusto
    const newTeam = [...pokemons, pokemon].slice(0, 4); // <-- Nunca más de 4
    setPokemons(newTeam);
    await fetchTypes(newTeam);
    setShowModal(false);
  };

  const handleRemovePokemon = async (pokemonId) => {
    const newTeam = pokemons.filter(p => p.id !== pokemonId);
    setPokemons(newTeam);
    await fetchTypes(newTeam);
  };

  const handleSaveTeam = async () => {
    if (pokemons.length !== 4) {
      setError('Debes tener exactamente 4 Pokémon en tu equipo para guardarlo.');
      return;
    }

    try {
      const pokemonIds = pokemons.map(p => p.id);
      await assignPokemonsToTeam(id, pokemonIds);
      setError('');
      alert('¡Equipo guardado con éxito!');
    } catch (err) {
      console.error('Error al guardar el equipo:', err);
      setError('Ocurrió un error al guardar el equipo.');
    }
  };

  return (
    <div className="team-detail-wrapper">
      <h2 className="team-title">Equipo: {team?.name}</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="team-grid">
        {(() => {
          const slots = [...pokemons];
          while (slots.length < 4) slots.push(null);
          return slots.map((poke, index) =>
            poke ? (
              <div key={index} className="pokemon-card">
                <button className="remove-button" onClick={() => handleRemovePokemon(poke.id)}>❌</button>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`}
                  alt={poke.name}
                  className="poke-img"
                />
                <div className="types">
                  {(pokemonTypes[poke.id] || []).map((type, i) => (
                    <span key={i} className={`pokemon-type type-${type.toLowerCase()}`}>
                      {type.toUpperCase()}
                    </span>
                  ))}
                </div>
                <h3>{poke.name}</h3>
                <div className="stats">
                  <p><strong>ATQ:</strong> {poke.attack}</p>
                  <p><strong>DEF:</strong> {poke.defense}</p>
                  <p><strong>VEL:</strong> {poke.speed}</p>
                  <p><strong>EXP:</strong> {poke.base_experience}</p>
                </div>
              </div>
            ) : (
              <div key={index} className="pokemon-card empty" onClick={() => setShowModal(true)}>
                <span className="plus-icon">+</span>
                <p>Añadir Pokémon</p>
              </div>
            )
          );
        })()}
      </div>

      <button className="save-button" onClick={handleSaveTeam}>Guardar equipo</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Selecciona un Pokémon</h3>
            <div className="pokemon-list">
              {allPokemons
                .filter(p => !pokemons.some(pk => pk.id === p.id))
                .map(p => (
                  <div key={p.id} className="pokemon-option">
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                      alt={p.name}
                      width={50}
                    />
                    <div className="poke-info">
                      <strong>{p.name}</strong>
                      <p>ATQ: {p.attack} | DEF: {p.defense} | VEL: {p.speed}</p>
                    </div>
                    <button onClick={() => handleAddPokemon(p)}>Añadir</button>
                  </div>
                ))}
            </div>
            <button className="close-button" onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetail;
