const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const task = new Task({ ...req.body, userId: req.user.id });
  await task.save();
  res.json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
};
