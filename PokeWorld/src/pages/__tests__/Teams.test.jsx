import { render, screen } from '@testing-library/react';
import Teams from '../Teams';
import { BrowserRouter } from 'react-router-dom';

describe('Teams page', () => {
  it('renderiza el título y el formulario de crear equipo', () => {
    render(
      <BrowserRouter>
        <Teams />
      </BrowserRouter>
    );

    expect(screen.getByText(/mis equipos/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/nombre del equipo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear equipo/i })).toBeInTheDocument();
  });
});