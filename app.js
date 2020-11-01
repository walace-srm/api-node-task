const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');

const url = 'mongodb+srv://admin:vasco070488@clusterfree-ai9uf.mongodb.net/task-manager?retryWrites=true&w=majority'
//const url = 'http://localhost:3001'
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true, useUnifiedTopology: true };

//verificar se realmente é necessario
mongoose.Promise = global.Promise;

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conxâo com o banco de dados:' + err);
})

mongoose.connection.on('disconected', () => {
    console.log('Aplicação desconectada do banco de dados');
})

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados');
})


//BODY PARSER
// app.use(bodyParser.urlencoded({extended: false}));
 app.use(cors());
 app.use(bodyParser.json());

//const indexRoute = require('./Routes/index');
const indexRoute = require('./Routes/index')
const tasksRoute = require('./Routes/tasks');
const usersRoute = require('./Routes/users');

//app.use('/auth', usersRoute);
app.use('/users', usersRoute)
app.use('/', tasksRoute);

//app.use('/', indexRoute);
app.get('/', tasksRoute);
app.post('/', tasksRoute);
app.put('/:id', tasksRoute);
app.delete('/:id', tasksRoute);
//app.post('/create', indexRoute);
app.post('/create', usersRoute);
app.get('/', usersRoute);
app.post('/auth', usersRoute);
app.listen(process.env.PORT || 3001);

module.exports = app;

//mongodb+srv://admin:vasco070488@clusterfree-ai9uf.mongodb.net/test?retryWrites=true&w=majority
