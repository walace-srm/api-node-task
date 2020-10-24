const express = require('express'); // importa o express

const server = express(); // cria uma variável chamada server que chama a função express

//server.listen(3001); // faz com que o servidor seja executado na porta 3000 do seu localhost:3000


server.get('/tasks', (req, res) => {
    return res.json({message: 'Foi'});
}) // Cria a rota /teste com o método GET, o console.log retornará no terminal ‘teste’ caso tenha executado com sucesso.
    
server.listen(3001); // faz com que o servidor seja executado na porta 3000 do seu localhost:3000