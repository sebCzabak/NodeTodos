const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const todoRouter = require('../routes/todos');
const authRouter = require('../routes/auth');
const auth = require('../middleware/auth');
const User = require('../models/user');
const Todo = require('../models/todo');

const app = express();
app.use(express.json());
app.use('/auth', authRouter);
app.use('/todos', auth, todoRouter);

beforeAll(async () => {
  const url = `mongodb://127.0.0.1:27017/todoapp_test`;
  await mongoose.connect(url);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Todos API', () => {
  let token;

  beforeAll(async () => {
    // Register a new user and get the token
    await request(app).post('/auth/register').send({
      username: 'testuser',
      password: 'testpassword',
    });

    const res = await request(app).post('/auth/login').send({
      username: 'testuser',
      password: 'testpassword',
    });

    token = res.body.token;
  });

  it('should create a new todo', async () => {
    const res = await request(app).post('/todos').set('Authorization', `Bearer ${token}`).send({
      title: 'Test Todo',
      description: 'Test Description',
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Test Todo');
  });

  it('should get all todos', async () => {
    const res = await request(app).get('/todos').set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a single todo', async () => {
    const todo = new Todo({
      title: 'Another Test Todo',
      description: 'Another Test Description',
    });
    await todo.save();

    const res = await request(app).get(`/todos/${todo._id}`).set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Another Test Todo');
  });

  it('should update a todo', async () => {
    const todo = new Todo({
      title: 'Todo to Update',
      description: 'Update Description',
    });
    await todo.save();

    const res = await request(app).patch(`/todos/${todo._id}`).set('Authorization', `Bearer ${token}`).send({
      title: 'Updated Todo',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Updated Todo');
  });

  it('should delete a todo', async () => {
    const todo = new Todo({
      title: 'Todo to Delete',
      description: 'Delete Description',
    });
    await todo.save();

    const res = await request(app).delete(`/todos/${todo._id}`).set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Deleted Todo');
  });
});
