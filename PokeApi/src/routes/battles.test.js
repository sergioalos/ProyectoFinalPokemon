const request = require('supertest');
const app = require('../app');

describe('Battles routes', () => {
  test('GET /battles/my-history requiere auth', async () => {
    const res = await request(app).get('/battles/my-history');
    expect(res.status).toBe(401);
  });
});