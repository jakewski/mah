const router = require('express').Router();
const store = require('../store');

router.post('/', (req, res, next) => {
  req.session.room = req.body.room;
  req.session.activeRoom = true;
  res.send( {
    activeRoom: req.session.activeRoom,
    room: req.body.room,
  });
})

router.get('/', (req, res, next) => {
  res.send( {
    activeRoom: req.session.activeRoom,
    room: req.session.room,
  });
});

router.post('/players', (req, res, next) => {
  if (!store.getState().game[req.body.room]) res.send({players: null})
  let roomPlayers = store.getState().game[req.body.room].gamePlayers
  res.send({players: roomPlayers})
})

router.delete('/', (req, res, next) => {
  req.session.room = null;
  req.session.activeRoom = false;
  res.send('room removed')
})

module.exports = router;
