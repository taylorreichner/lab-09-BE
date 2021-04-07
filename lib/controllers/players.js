const { Router } = require('express')
const Player = require(`../models/Player`)

module.exports = Router()

    .post('/', async (req, res, next) => {
        Player
            .insert(req.body)
            .then(player => res.send(player))
            .catch(next)
    })

    .get('/:id', async (req, res, next) => {
        Player
            .findById(req.params.id)
            .then(player => res.send(player))
            .catch(next)
    })

    .put('/:id', async (req, res, next) => {
        Player
            .update(req.body.rank, req.params.id)
            .then(player => res.send(player))
            .catch(next)
    })

    .delete('/:id', async (req, res, next) => {
        Player
            .delete(req.params.id)
            .then(player => res.send(player))
            .catch(next)
    })

    .get('/', async (req, res, next) => {
        Player
            .findAll()
            .then(player => res.send(player))
            .catch(next)
    })