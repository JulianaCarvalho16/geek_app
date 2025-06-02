const { db } = require('../config/firebase');
const { collection, addDoc, getDocs, query, where } = require('firebase/firestore');

exports.createTask = async( req, res ) => {
    const { title, description, boardId, date, time} = req.body;

    try {
        const task = await Task.create({
            title,
            description,
            boardId,
            userId: req.uid,
            date,
            time,
            createAt: new Date(),
        })

        res.status(201).json({id: newTask.id, message: 'Tarefa Criada com sucesso'});
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar a tarefa' });
    }
};

exports.getTask = async ( req, res ) => {
    try {
        const tasksRef = await collection(db, 'tasks');
        const q = query(tasksRef, where('userId', '==', req.uid));
        const snapshot = await getDocs(q);
        const tasks = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.date(),
        }));
        
        res.status(200).json(tasks);
    } catch (err) {
        console.error('Erro ao buscar tarefas', err)
        res.status(500).json({ error: 'Erro ao buscar tarefas'});
    }
};