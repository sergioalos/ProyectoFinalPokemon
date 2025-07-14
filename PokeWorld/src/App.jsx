import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PokemonList from './pages/PokemonList';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Teams from './pages/Teams';
import TeamDetail from './pages/TeamDetail';
import PrivateRoute from './components/PrivateRoute';
import BattleStart from './pages/battleStart';
import BattleInProgress from './pages/BattleInProgress';
import BattleHistory from './pages/BattleHistory';
import Ranking from './pages/Ranking';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemons" element={<PokemonList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/equipos"
          element={
            <PrivateRoute>
              <Teams />
            </PrivateRoute>
          }
        />
        <Route
          path="/equipos/:id"
          element={
            <PrivateRoute>
              <TeamDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/batalla"
          element={
            <PrivateRoute>
              <BattleStart />
            </PrivateRoute>
          }
        />
        <Route
          path="/battles/:id"
          element={
            <PrivateRoute>
              <BattleInProgress />
            </PrivateRoute>
          }
        />
        <Route
          path="/battle-history"
          element={
            <PrivateRoute>
              <BattleHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/ranking"
          element={
            <PrivateRoute>
              <Ranking />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
