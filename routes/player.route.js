const express = require('express')
const router = express.Router()

const player_controller = require('../controllers/player.controller')

/**
 * @api {get} /hello/{name} Prints "Hello {name}"
 * @apiName Hello
 * @apiParam (Url) {String} name the name to print
 * @apiSuccess (200) {String} message the hello {name} message
 */
router.get('/hello/:name', player_controller.hello)

/**
 * @api {post} /create Creates player
 * @apiName createUser
 * @apiParam {String} name Users name.
 * @apiParam {Number} score Users score.

 * @apiSuccess (200) {String} message player created
 */
router.post('/create', player_controller.player_create)

/**
 * @api {get} /get/{username} Gets the requested player
 * @apiName getUser
 * @apiParam (Url) {String} id Users unique id.
 * @apiSuccess (200) {Object} returns players details
 */
router.get('/get/:username', player_controller.player_details)

/**
 * @api {put} /{username}/update Updates the players details
 * @apiName updateUserDetails
 * @apiParam (Url) {String} username Users unique ID.
 * @apiParam {Number} score Users new score.
 * @apiSuccess (200) {Object} returns updated player
 */
router.put('/:username/update', player_controller.player_update)

/**
 * @api {delete} /{username}/delete Deletes the player
 * @apiName deleteUser
 * @apiParam (Url) {String} username Users name.

 * @apiSuccess (200) {String} message player deleted
 */
router.delete('/:username/delete', player_controller.player_delete)

/**
 * @api {get} /all Gets a list of all the players
 * @apiName getAllPlayers
 * @apiSuccess (200) {Object} returns players details
 */
router.get('/all', player_controller.all_players)

module.exports = router
