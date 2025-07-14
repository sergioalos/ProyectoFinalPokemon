import { render, screen } from '@testing-library/react';
import Ranking from '../Ranking';
import { BrowserRouter } from 'react-router-dom';

describe('Ranking page', () => {
  it('renderiza el título del ranking', () => {
    render(
      <BrowserRouter>
        <Ranking />
      </BrowserRouter>
    );

    expect(screen.getByText(/ranking global/i)).toBeInTheDocument();
  });
});