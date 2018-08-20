const Player = require('../models/player.model')

exports.hello = (req, res) => {
  res.send('Hello world')
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
  Player.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
    err,
    player
  ) {
    if (err) return next(err)
    res.send('Player udpated.')
  })
}

exports.player_delete = (req, res) => {
  Player.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err)
    res.send('Deleted successfully!')
  })
}
