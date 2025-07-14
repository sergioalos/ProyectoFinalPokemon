import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';
import { AuthContext } from '../../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import * as authApi from '../../api/auth';

describe('Login component', () => {
  const loginMock = vi.fn();

  const renderWithProviders = () => {
    render(
      <AuthContext.Provider value={{ login: loginMock }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  it('renderiza correctamente los elementos del formulario', () => {
    renderWithProviders();

    expect(screen.getByPlaceholderText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('muestra un mensaje de error si las credenciales son incorrectas', async () => {
    vi.spyOn(authApi, 'loginUser').mockRejectedValue(new Error('Credenciales incorrectas'));

    renderWithProviders();

    fireEvent.change(screen.getByPlaceholderText(/correo electrónico/i), {
      target: { value: 'test@email.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: '123456' }
    });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(await screen.findByText(/credenciales incorrectas/i)).toBeInTheDocument();
  });

  it('envía las credenciales correctamente', async () => {
    const loginUserMock = vi.spyOn(authApi, 'loginUser').mockResolvedValue({ token: '12345' });

    renderWithProviders();

    fireEvent.change(screen.getByPlaceholderText(/correo electrónico/i), {
      target: { value: 'test@email.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: '123456' }
    });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(loginUserMock).toHaveBeenCalledWith({ email: 'test@email.com', password: '123456' });
  });
});
