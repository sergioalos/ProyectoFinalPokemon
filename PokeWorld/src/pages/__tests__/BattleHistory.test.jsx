import { render, screen } from '@testing-library/react';
import BattleHistory from '../BattleHistory';
import { BrowserRouter } from 'react-router-dom';

// Mock de axios para evitar peticiones reales y errores de interceptors
vi.mock('axios', () => {
  const axiosGetMock = (url) => {
    if (url.includes('battles/my-history')) {
      return Promise.resolve({
        data: [
          {
            id: 1,
            createdAt: new Date().toISOString(),
            team1: { id: 1, name: 'Equipo 1' },
            team2: { id: 2, name: 'Equipo 2' },
            winner_team: { id: 1, name: 'Equipo 1' },
          },
        ],
      });
    }
    if (url.includes('stats/my-stats')) {
      return Promise.resolve({ data: { battles_won: 1, battles_lost: 0 } });
    }
    return Promise.resolve({ data: [] });
  };
  // Mock de la función create y los interceptors
  const apiInstance = {
    get: axiosGetMock,
    interceptors: {
      request: { use: () => {} },
      response: { use: () => {} },
    },
  };
  return {
    default: {
      get: axiosGetMock,
      create: () => apiInstance,
      interceptors: {
        request: { use: () => {} },
        response: { use: () => {} },
      },
    },
  };
});

describe('BattleHistory page', () => {
  it('renderiza el título del historial de combates', async () => {
    render(
      <BrowserRouter>
        <BattleHistory />
      </BrowserRouter>
    );

    expect(await screen.findByText(/historial de combates/i)).toBeInTheDocument();
  });
});