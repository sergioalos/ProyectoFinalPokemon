const request = require('supertest');
const app = require('../app');

describe('Effectiveness routes', () => {
  test('GET /effectiveness responde', async () => {
    const res = await request(app).get('/effectiveness');
    expect(res.status).toBe(200);
  });
});