const Player = require('../models/player.model')

exports.hello = (req, res) => {
  const name = req.params.name
  res.send(`Hello ${name}`)
}

exports.player_create = (req, res) => {
  let player = new Player({
    name: req.body.name,
    score: req.body.score
  })

  player.save(function(err) {
    if (err) {
      return next(err)
    }
    res.send('Player Created successfully')
  })
}

exports.player_details = (req, res) => {
  Player.findById(req.params.id, (err, player) => {
    if (err) return next(err)
    res.send(player)
  })
}

exports.player_update = (req, res) => {
  Player.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, player) => {
    if (err) return next(err)
    res.send(player)
  })
}

exports.player_delete = (req, res) => {
  Player.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err)
    res.send('Deleted successfully!')
  })
}
