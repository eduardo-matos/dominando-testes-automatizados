const request = require('supertest');
const db = require('../src/db/db');
const User = require('../src/db/user');
const app = require('../src/routes');
const bcrypt = require('bcryptjs');

beforeAll(() => {
  return db.sync();
});

afterAll(() => {
  return db.close();
});

beforeEach(() => {
  return db.truncate();
})

describe('Create user', () => {
  it('should return a json response', async () => {
    const params = { username: 'edu', password: '12345678' };

    const resp = await request(app).post('/users').send(params);

    expect(resp.headers['content-type']).toMatch(/application\/json/);
  });

  it('should create user', async () => {
    const params = { username: 'edu', password: '12345678' };

    const resp = await request(app).post('/users').send(params);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ success: true });
    expect(await User.findOne({ where: { username: params.username} })).not.toBe(null);
  });

  it('should not create user if username is empty', async () => {
    const params = { username: '', password: '12345678' };

    const resp = await request(app).post('/users').send(params);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toEqual({ msg: 'Please enter all fields', success: false });
    expect(await User.findOne({ where: { username: params.username} })).toBe(null);
  });

  it('should not create user if password has less than 8 characters', async () => {
    const params = { username: 'Edu', password: '1234567' };

    const resp = await request(app).post('/users').send(params);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toEqual({ msg: 'The password should contain at least 8 characters', success: false });
    expect(await User.findOne({ where: { username: params.username} })).toBe(null);
  });

  it('should not create user if username already exists', async () => {
    await User.create({ username: 'Edu', password: '' });
    const params = { username: 'Edu', password: '12345678' };

    const resp = await request(app).post('/users').send(params);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toEqual({ msg: 'User already exists', success: false });
    expect(await User.count({ where: { username: params.username} })).toBe(1);
  });

  it('password should be hashed', async () => {
    const params = { username: 'Edu', password: '12345678' };

    const resp = await request(app).post('/users').send(params);

    const user = await User.findOne({ where: { username: params.username} });
    expect(user.password).not.toBe(params.password);
    expect(await bcrypt.compare(params.password, user.password)).toBe(true);
  });
});
