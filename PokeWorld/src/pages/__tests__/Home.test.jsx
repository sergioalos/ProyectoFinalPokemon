import { render, screen } from '@testing-library/react';
import Home from '../Home';
import { BrowserRouter } from 'react-router-dom';

describe('Home page', () => {
  it('renderiza el título y los textos principales', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText(/¡atrápalos ya!/i)).toBeInTheDocument();
    expect(screen.getByText(/explora el mundo de pokémon/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /comenzar/i })).toBeInTheDocument();
  });
});