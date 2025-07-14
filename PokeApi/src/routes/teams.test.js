const request = require('supertest');
const app = require('../app');

describe('Teams routes', () => {
  test('GET /teams/my requiere auth', async () => {
    const res = await request(app).get('/teams/my');
    expect(res.status).toBe(401);
  });
});