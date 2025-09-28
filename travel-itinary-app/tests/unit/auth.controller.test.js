const request = require('supertest');
const app = require('../../app'); 
const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../models/userModel');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user', async () => {
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedpass');
    User.create.mockResolvedValue({
      _id: 'id123',
      email: 'testuser@gmail.com'
    });
    jwt.sign.mockReturnValue('token123');

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@gmail.com',
        password: 'Test@1234'
      });

    expect(res.statusCode).toEqual(201);
  });

  it('should not register existing user', async () => {
    User.findOne.mockResolvedValue({ _id: 'id123' });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@gmail.com',
        password: 'Test@1234'
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
  });

  it('should not register with missing fields', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'testuser@gmail.com', password: 'Test@1234' }); // missing username

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch("All fields are mandatory!");
  });

  it('should login a registered user', async () => {
    User.findOne.mockResolvedValue({
      username: 'testuser',
      password: 'hashedpass'
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token123');

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'Test@1234' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken', 'token123');
  });

  it('should reject login with wrong password', async () => {
    User.findOne.mockResolvedValue({
      _id: 'id123',
      username: 'testuser',
      email: 'testuser@gmail.com',
      password: 'hashedpass'
    });
    bcrypt.compare.mockResolvedValue(false);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'wrongpass' });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message');
     expect(res.body.message).toMatch("Invalid password");
  });

  it('should reject login for non-existent user', async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'nouser', password: 'Test@1234' });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch("Invalid username");
  });
});