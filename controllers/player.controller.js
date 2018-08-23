const Player = require('../models/player.model')

exports.hello = (req, res) => {
  const name = req.params.name
  res.send(`Hello ${name}`)
}

exports.player_create = async (req, res) => {
  try {
    let player
    player = await Player.find({ name: req.body.name })

    if (!player.length) {
      player = new Player({
        name: req.body.name,
        score: req.body.score
      })
    }
    await player.save()
    res.status(200).send(player)
  } catch (error) {
    res.send({ error: `player not saved: ${error}` })
  }
}

exports.player_details = async (req, res) => {
  try {
    let player = await Player.find({ name: req.params.username })
    const foundPlayer = player[0]
    player = await Player.findById(foundPlayer._id)
    res.status(200).send(player)
  } catch (error) {
    res.send({ error: `player not found: ${error}` })
  }
}

exports.player_update = async (req, res) => {
  try {
    let player = await Player.find({ name: req.params.username })
    const foundPlayer = player[0]
    const newScore = foundPlayer.score + 1
    player = await Player.findByIdAndUpdate(
      foundPlayer._id,
      {
        $set: { score: newScore }
      },
      { new: true }
    )
    res.status(200).send(player)
  } catch (error) {
    res.send({ error: `player not updated: ${error}` })
  }
}

exports.player_delete = async (req, res) => {
  try {
    const player = await Player.find({ name: req.params.username })
    const foundPlayer = player[0]
    await Player.findByIdAndRemove(foundPlayer._id)
    res.status(200).send('Deleted successfully!')
  } catch (error) {
    res.send({ error: `player not deleted: ${error}` })
  }
}

exports.all_players = async (req, res) => {
  try {
    const players = await Player.find({})
    res.send(players)
  } catch (error) {
    res.send({ error: `players not found: ${error}` })
  }
}
