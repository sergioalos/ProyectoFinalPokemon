import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../assets/css/Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">PokéWorld</Link>
      <div className="navbar-links">
        <Link to="/pokemons" className="navbar-link">Pokédex</Link>
        {isAuthenticated && (
          <>
            <Link to="/equipos" className="navbar-link">Equipos</Link>
            <Link to="/batalla" className="navbar-link">Batalla</Link>
            <Link to="/battle-history" className="navbar-link">Historial</Link>
            <Link to="/ranking" className="navbar-link">Ranking</Link>
          </>
        )}
        {isAuthenticated ? (
          <button className="navbar-btn logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        ) : (
          <>
            <Link to="/login" className="navbar-btn login">Iniciar sesión</Link>
            <Link to="/register" className="navbar-btn register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
