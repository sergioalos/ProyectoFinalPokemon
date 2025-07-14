const request = require('supertest');
const app = require('../app');

describe('Admin routes', () => {
  test('GET /admin/users requiere root', async () => {
    const res = await request(app).get('/admin/users');
    expect(res.status).toBe(401);
  });
});