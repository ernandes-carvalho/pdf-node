const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/infos', {useUnifiedTopology: true, useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Conexão ok');
    /*mongoose.connection.db.listCollections().toArray(function (err, names) {
        console.log(names); // [{ name: 'dbname.myCollection' }]
        module.exports.Collection = names;
    });*/
});

/*const Todo = require('./Todo.model');
var result = new Todo({title: 'Myname', done: false});
result.save(function (err){
    if(err) throw err;
    console.log('inserido com sucesso!');
});
*/
require('./routes')(app);
app.listen(3000, function (){
    console.log('Express PDF has been started...')
});
