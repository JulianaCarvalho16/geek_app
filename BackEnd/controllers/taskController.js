const Task = require('../models/Task');

exports.createTask = async( req, res ) => {
    const { title, description, boardId} = req.body;

    try {
        const task = await Task.create({
            title,
            description,
            boardId,
            userId: req.uid
        })

        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar a tarefa' });
    }
};

exports.getTask = async ( req, res ) => {
    try {
        const tasks = await Task.find({ userId: req.uid });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar tarefas'});
    }
};