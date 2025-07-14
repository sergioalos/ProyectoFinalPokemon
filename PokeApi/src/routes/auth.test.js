const request = require('supertest');
const app = require('../app');

describe('Auth routes', () => {
  test('POST /auth/login responde (aunque con datos vacíos)', async () => {
    const res = await request(app).post('/auth/login').send({});
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});