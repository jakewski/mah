const router = require('express').Router();

router.post('/', (req, res, next) => {
  req.session.name = req.body.name;
  req.session.socketId = req.body.socketId;
  req.session.activePlayer = true;
  req.session.sessionId = req.session.id;
  res.send( {
    name: req.body.name,
    socketId: req.body.socketId,
    activePlayer: true,
    sessionId: req.session.id,
  });
})

router.get('/', (req, res, next) => {
  res.send( {
    sessionId: req.session.id,
    name: req.session.name,
    socketId: req.session.socketId,
    activePlayer: req.session.activePlayer,
  });
});

router.delete('/', (req, res, next) => {
  req.session.destroy()
  .then(() => res.send('player removed'))
  .catch(next)
})

module.exports = router;
