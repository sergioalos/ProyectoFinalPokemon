// src/pages/__tests__/Teams.test.jsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Teams from '../Teams';
import { BrowserRouter } from 'react-router-dom';
import * as teamsApi from '../../api/teams';

describe('Teams básico', () => {
  beforeEach(() => {
    vi.spyOn(teamsApi, 'getUserTeams').mockResolvedValue([]);
  });

  it('renderiza título e input', () => {
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
