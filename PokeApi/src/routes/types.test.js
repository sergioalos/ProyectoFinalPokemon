const request = require('supertest');
const app = require('../app');

describe('Types routes', () => {
  test('GET /types responde', async () => {
    const res = await request(app).get('/types');
    expect(res.status).toBe(200);
  });
});