const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

//FUNÇÕES AUXILIARES
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, 'batatafrita2020', { expiresIn: '7d'});
}

router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    } 
    catch {
        return res.send( {error: 'Erro na consulta de usuários!'} )
    }
});

router.post('/create', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.send({ error: 'Dados insuficientes!' });

    try {
        if (await Users.findOne({ username })) return res.send({ error: 'Usuário já registrado!'});

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.send({user, token: (createUserToken(user.id)), message: 'Usuário cadastrado com sucesso!'});
    }
    catch (err) {
        return res.send({ error: err });
    }
});


//AUTENTICAÇÃO
router.post('/auth', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.send({ error: 'Dados insuficientes!' });

    try {
        const user = await Users.findOne( {username}).select('+password')
        if (!user) return res.send({ error: 'Usuário não registrado!' });

        const pass_ok = await bcrypt.compare(password, user.password);
        if(!pass_ok) return res.send({ error: 'Erro ao autenticar usuário!' });

        user.password = undefined;
        return res.send({user, token: createUserToken(user.id)});
    }
    catch {
        return res.send({ error: 'Erro ao buscar usuário!' });
    }

});

module.exports = router;
