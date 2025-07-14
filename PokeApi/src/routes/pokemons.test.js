const request = require('supertest');
const app = require('../app');

describe('Pokemons routes', () => {
  test('GET /pokemons responde', async () => {
    const res = await request(app).get('/pokemons');
    expect(res.status).toBe(200);
  });
});