import { render, screen } from '@testing-library/react';
import BattleStart from '../battleStart';
import { BrowserRouter } from 'react-router-dom';

// MOCKEA la API de equipos y de detalles de equipo
vi.mock('../../api/teams', () => ({
  getUserTeams: () => Promise.resolve([{ id: 1, name: 'Equipo Test' }]),
  getTeamById: () =>
    Promise.resolve({
      id: 1,
      name: 'Equipo Test',
      pokemons: [],
    }),
}));

describe('BattleStart page', () => {
  it('renderiza el título para iniciar batalla', async () => {
    render(
      <BrowserRouter>
        <BattleStart />
      </BrowserRouter>
    );

    expect(await screen.findByText(/iniciar una batalla/i)).toBeInTheDocument();
  });
});