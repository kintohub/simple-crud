const Player = require('../models/player.model')
const logs = require('../helpers/logsHelper')

exports.playerCreate = async (req, res) => {
  try {
    const player = await Player.findOneAndUpdate(
      { name: req.body.name },
      { $set: { name: req.body.name, score: req.body.score } },
      { upsert: true }
    )
    res.send(player)
  } catch (error) {
    const requestId = req.get('kinto-request-id')
    logs.logError(requestId, error)
    res.status(400).send({ error: `player not saved: ${error}` })
  }
}

exports.playerDetails = async (req, res) => {
  try {
    const player = await Player.findOne({ name: req.params.username })

    if (player === null) {
      res.status(401).send({ error: 'player not found' })
    }

    res.send(player)
  } catch (error) {
    logs.logError(requestId, error)
    res.status(400).send({ error: `player not found: ${error}` })
  }
}

exports.playerUpdate = async (req, res) => {
  try {
    const player = await Player.findOneAndUpdate(
      { name: req.params.username },
      { $inc: { score: 1 } },
      { new: true }
    )
    res.send(player)
  } catch (error) {
    const requestId = req.get('kinto-request-id')
    logs.logError(requestId, error)
    res.status(400).send({ error: `player not updated: ${error}` })
  }
}

exports.playerDelete = async (req, res) => {
  try {
    await Player.findOneAndDelete({ name: req.params.username })
    res.send('Deleted successfully!')
  } catch (error) {
    const requestId = req.get('kinto-request-id')
    logs.logError(requestId, error)
    res.status(400).send({ error: `player not deleted: ${error}` })
  }
}

exports.allPlayers = async (req, res) => {
  try {
    const players = await Player.find({})
    res.send(players)
  } catch (error) {
    const requestId = req.get('kinto-request-id')
    logs.logError(requestId, error)
    res.status(400).send({ error: `players not found: ${error}` })
  }
}
