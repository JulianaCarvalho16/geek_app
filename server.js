const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/trelloApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  userId: mongoose.Schema.Types.ObjectId
});

const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ error: 'Usuário já existe.' });
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  res.json(user);
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user });
});

app.get('/api/tasks', async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ error: 'Sem token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const tasks = await Task.find({ userId: decoded.id });
    res.json(tasks);
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.post('/api/tasks', async (req, res) => {
  const token = req.headers.authorization;
  const { title, description, status } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const task = await Task.create({ title, description, status, userId: decoded.id });
    res.json(task);
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.listen(3000, () => console.log('Server rodando na porta 3000'));