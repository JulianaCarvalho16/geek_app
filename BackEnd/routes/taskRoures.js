const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const verificarToken = require('../middlewere/authMiddlewere');

router.post('/tasks', verificarToken, taskController.createTask);
router.get('/tasks', verificarToken, taskController.getTask);

module.exports = router;