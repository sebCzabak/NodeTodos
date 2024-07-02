const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Nowa składnia połączenia z MongoDB
mongoose
  .connect('mongodb://localhost:27017/todoapp')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Connection error', err);
  });

const todoRouter = require('./routes/todos');
const authRouter = require('./routes/auth');
const auth = require('./middleware/auth');

app.use('/auth', authRouter);
app.use('/todos', auth, todoRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
