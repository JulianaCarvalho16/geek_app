const mongoose = require('mongoose');

const taskSquema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, default: 'todo' },
    boardId: String,
    userId: { type:String, required: true },
}, {timestamps: true});

module.exports = mongoose.model('Task', taskSquema);