const router = require('express').Router();

router.post('/set', (req, res, next) => {
  req.session.name = req.body.name;
  req.session.socketId = req.body.socketId;
  req.session.activePlayer = true;
  req.session.sessionId = req.session.id
  res.send( {
    name: req.body.name,
    socketId: req.body.socketId,
    activePlayer: true,
    sessionId: req.session.id,
  });
})

router.get('/me', (req, res, next) => {
  console.log('req session:', req.session.name)
  res.send( { 
    sessionId: req.session.id,
    name: req.session.name,
    socketId: req.session.socketId,
    activePlayer: req.session.activePlayer,
  });
});

router.delete('/remove', (req, res, next) => {
  req.session.destroy()
  res.send('player removed')
})

module.exports = router;
