const express = require('express');
const router = express.Router();
const Tasks = require('../model/task');
const auth = require('../middlewares/auth');

//Async Await
//TODO:verificar token 'auth'
router.get('/', async (req, res) => {
    try {
        const tasks = await Tasks.find({});
        return res.send(tasks);
    }
    catch (err) {
        return res.send({ error: 'Erro na consulta de tarefas!' });
    }
});

router.post('/', async (req, res) => {
    try {
        const task = await  Tasks.create(req.body);
        return res.send(task);
    }
    catch (err) {
        return res.send({ error: 'Erro ao criar tarefa!' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const task = await  Tasks.findByIdAndUpdate({_id: req.params.id}, req.body, { new: true });
        task.done = !task.done;
        task.save();
        return res.send(task);
    }
    catch (err) {
        return res.send({ error: 'Erro ao atualizar tarefa!' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
     await  Tasks.findByIdAndDelete({_id: req.params.id});
        return res.json({ message: 'Tarefa excluída com sucesso'});
    }
    catch (err) {
        return res.send({ error: 'Erro ao deletar tarefa!' });
    }
});


module.exports = router;
