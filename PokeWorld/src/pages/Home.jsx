import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Home.css';

const Home = () => {
  return (
    <div className="home-bg">
      <div className="home-card">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="Pokémon Logo"
          className="home-logo"
        />
        <h1 className="home-title">¡Atrápalos ya!</h1>
        <p className="home-description">
          ¡Explora el mundo de Pokémon y forma tu equipo!
        </p>
        <Link to="/pokemons" className="home-main-button">
          Comenzar
        </Link>
      </div>
    </div>
  );
};

export default Home;
