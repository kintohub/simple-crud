const express = require('express')
const router = express.Router()

const player_controller = require('../controllers/player.controller')

/**
 * @api {post} /create Creates player
 * @apiName createUser
 * @apiParam {String} name Players escaped slack username.
 * @apiParam {Number} score Users score, sent by default at 0 on creation.
 * @apiSuccess {Object} response Information about the player that was created
 * @apiError {String} error.name message for an invalid name
 */
router.post('/create', player_controller.player_create)

/**
 * @api {get} /get/{username} Gets the requested player
 * @apiName getUser
 * @apiParam (Url) {String} id Users unique id.
 * @apiSuccess {Object} returns players details
 * @apiError {String} error.username player not found
 */
router.get('/get/:username', player_controller.player_details)

/**
 * @api {put} /{username}/update Updates the players details
 * @apiName updateUserDetails
 * @apiParam (Url) {String} username Users slack username.
 * @apiSuccess {Object} returns updated player
 * @apiError {String} error.username player not found
 */
router.put('/:username/update', player_controller.player_update)

/**
 * @api {delete} /{username}/delete Deletes the player
 * @apiName deleteUser
 * @apiParam (Url) {String} username Users name.
 * @apiSuccess {String} message confirming player deleted
 * @apiError {String} error.username player not found
 */
router.delete('/:username/delete', player_controller.player_delete)

/**
 * @api {get} /all Gets a list of all the players
 * @apiName getAllPlayers
 * @apiSuccess {Object} returns details for all the players
 * @apiError {String} error players not found
 */
router.get('/all', player_controller.all_players)

module.exports = router
