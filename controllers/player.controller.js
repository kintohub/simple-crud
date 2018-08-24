const Player = require('../models/player.model')
const logs = require('../helpers/logsHelper')

exports.player_create = async (req, res) => {
  try {
    let player
    player = await Player.findOne({ name: req.body.name })

    if (!!player) {
      player = new Player({
        name: req.body.name,
        score: req.body.score
      })
    }
    await player.save()
    res.status(200).send(player)
  } catch (error) {
    const requestId = req.get('kinto-request-id')
    logs.logError(requestId, error)
    res.status(400).send({ error: `player not saved: ${error}` })
  }
}

exports.player_details = async (req, res) => {
  try {
    const player = await Player.findOne({ name: req.params.username })
    res.status(200).send(player)
  } catch (error) {
    logs.logError(requestId, error)
    res.status(400).send({ error: `player not found: ${error}` })
  }
}

exports.player_update = async (req, res) => {
  try {
    const score = await Player.findOne({ name: req.params.username }, 'score')
    console.log(score)
    const newScore = score + 1
    const player = await Player.findOneAndUpdate(
      { name: req.params.username },
      {
        $set: { score: newScore }
      },
      { new: true }
    )
    res.status(200).send(player)
  } catch (error) {
    const requestId = req.get('kinto-request-id')
    logs.logError(requestId, error)
    res.status(400).send({ error: `player not updated: ${error}` })
  }
}

exports.player_delete = async (req, res) => {
  try {
    await Player.findOneAndDelete({ name: req.params.username })
    res.status(200).send('Deleted successfully!')
  } catch (error) {
    const requestId = req.get('kinto-request-id')
    logs.logError(requestId, error)
    res.status(400).send({ error: `player not deleted: ${error}` })
  }
}

exports.all_players = async (req, res) => {
  try {
    const players = await Player.find({})
    res.send(players)
  } catch (error) {
    const requestId = req.get('kinto-request-id')
    logs.logError(requestId, error)
    res.status(400).send({ error: `players not found: ${error}` })
  }
}
