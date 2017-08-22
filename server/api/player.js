const router = require('express').Router();

router.post('/', (req, res, next) => {
  req.session.name = req.body.name || null;
  req.session.socketId = req.body.socketId || null;
  req.session.activePlayer = true;
  req.session.sessionId = req.session.id || null;
  res.status(202).send( {
    name: req.body.name,
    socketId: req.body.socketId,
    activePlayer: true,
    sessionId: req.session.id,
  })
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
  res.sendStatus(204)
})

module.exports = router;
