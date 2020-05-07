const mongoose = require('mongoose');

const todo = new mongoose.Schema({
    title: 'String',
    done: 'Boolean'
},{
    collection: 'todo'
});

module.exports = mongoose.model('Todo', todo);
