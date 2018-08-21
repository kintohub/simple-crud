const Player = require('../models/player.model')

exports.hello = (req, res) => {
  const name = req.params.name
  res.send(`Hello ${name}`)
}

exports.player_create = async (req, res) => {
  try {
    let player = new Player({
      name: req.body.name,
      score: req.body.score
    })
    await player.save()
    res.status(200).send(player)
  } catch (error) {
    res.send({ error: `player not saved: ${error}` })
  }
}

exports.player_details = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id)
    res.status(200).send(player)
  } catch (error) {
    res.send({ error: `player not found: ${error}` })
  }
}

exports.player_update = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, {
      $set: req.body
    })
    res.status(200).send(player)
  } catch (error) {
    res.send({ error: `player not updated: ${error}` })
  }
}

exports.player_delete = async (req, res) => {
  try {
    const player = await Player.findByIdAndRemove(req.params.id)
    res.status(200).send('Deleted successfully!')
  } catch (error) {
    res.send({ error: `player not deleted: ${error}` })
  }
}
