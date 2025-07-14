import { render, screen } from '@testing-library/react';
import TeamDetail from '../TeamDetail';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

describe('TeamDetail page', () => {
  it('renderiza el título del equipo', () => {
    // Usamos MemoryRouter para simular el parámetro :id
    render(
      <MemoryRouter initialEntries={['/equipos/1']}>
        <TeamDetail />
      </MemoryRouter>
    );

    // Solo comprobamos que aparece el texto "Equipo:" (el nombre depende de la API)
    expect(screen.getByText(/equipo:/i)).toBeInTheDocument();
  });
});