const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;
let app;
let agent; // session persistence
let journalId;
let resourceId;

jest.setTimeout(30000); // extend timeout for slower MongoMemoryServer startup

beforeAll(async () => {
  console.log('Starting in-memory MongoDB...');
  mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri();
  console.log('MongoDB started at', process.env.MONGODB_URI);

  app = require('../app');
  await require('../config/db')(process.env.MONGODB_URI);

  agent = request.agent(app); // maintain session cookies
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

// --- API Base ---
test('GET / returns ok', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toBe(200);
  expect(res.body.ok).toBe(true);
});

// --- AUTH TESTS ---
describe('Auth Routes', () => {
  test('Register user', async () => {
    const res = await agent.post('/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'student'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe('test@example.com');
  });

  test('Login user', async () => {
    const res = await agent.post('/auth/login').send({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe('test@example.com');
  });
});

// --- JOURNAL CRUD ---
describe('Journal Routes', () => {
  test('POST /journal/entry', async () => {
    const res = await agent.post('/journal/entry').send({ entry: 'My first journal entry' });
    expect(res.statusCode).toBe(201);
    expect(res.body.entry).toBe('My first journal entry');
    journalId = res.body._id;
  });

  test('GET /journal', async () => {
    const res = await agent.get('/journal');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('PUT /journal/:id', async () => {
    const res = await agent.put(`/journal/${journalId}`).send({ entry: 'Updated journal entry' });
    expect(res.statusCode).toBe(200);
    expect(res.body.entry).toBe('Updated journal entry');
  });

  test('DELETE /journal/:id', async () => {
    const res = await agent.delete(`/journal/${journalId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Journal entry deleted');
  });
});

// --- RESOURCES CRUD ---
describe('Resources Routes', () => {
  test('POST /resources', async () => {
    const res = await agent.post('/resources').send({
      title: 'Math Notes',
      description: 'Algebra notes',
      link: 'http://example.com/algebra'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Math Notes');
    resourceId = res.body._id;
  });

  test('GET /resources', async () => {
    const res = await agent.get('/resources');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('PUT /resources/:id', async () => {
    const res = await agent.put(`/resources/${resourceId}`).send({ description: 'Updated description' });
    expect(res.statusCode).toBe(200);
    expect(res.body.description).toBe('Updated description');
  });

  test('DELETE /resources/:id', async () => {
    const res = await agent.delete(`/resources/${resourceId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Resource deleted');
  });
});