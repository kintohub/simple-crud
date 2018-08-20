const express = require('express')
const router = express.Router()

const player_controller = require('../controllers/player.controller')

router.get('/hello', player_controller.hello)

router.post('/create', player_controller.player_create)

router.get('/:id', player_controller.player_details)

router.put('/:id/update', player_controller.player_update)

router.delete('/:id/delete', player_controller.player_delete)

module.exports = router
