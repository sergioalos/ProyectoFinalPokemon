import { render, screen } from '@testing-library/react';
import Register from '../Register';
import { BrowserRouter } from 'react-router-dom';

describe('Register page', () => {
  it('renderiza el formulario de registro', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByText(/registrarse/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/nombre de usuario/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/correo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Repite la contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();
  });
});