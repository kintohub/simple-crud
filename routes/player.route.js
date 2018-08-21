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
 * @api {post} /create Creates user
 * @apiName createUser
 * @apiParam {String} name Users name.
 * @apiParam {Number} score Users score.

 * @apiSuccess (200) {String} message user created
 */
router.post('/create', player_controller.player_create)

/**
 * @api {get} /{id} Gets the requested user
 * @apiName getUser
 * @apiParam (Url) {String} id Users unique ID.

 * @apiSuccess (200) {Object} returns users details
 */
router.get('/:id', player_controller.player_details)

/**
 * @api {put} /{id}/update Updates the users details
 * @apiName updateUserDetails
 * @apiParam (Url) {String} id Users unique ID.
 * @apiParam {String} [name] Users new name.
 * @apiParam {Number} [score] Users new score.
 * @apiSuccess (200) {Object} returns updated user
 */
router.put('/:id/update', player_controller.player_update)

/**
 * @api {delete} /{id}/delete Deletes the user
 * @apiName deleteUser
 * @apiParam (Url) {String} id Users unique ID.

 * @apiSuccess (200) {String} message user deleted
 */
router.delete('/:id/delete', player_controller.player_delete)

module.exports = router
