const request = require('supertest');
const app = require('../app');

describe('Stats routes', () => {
  test('GET /stats/ranking responde', async () => {
    const res = await request(app).get('/stats/ranking');
    expect(res.status).toBe(200);
  });
});