const router = require('express').Router();

router.post('/set', (req, res, next) => {
  console.log('req session here', req.session.player)
  req.session.player = {
    name: req.body.name,
    socketId: req.body.socketId,
    sessionId: req.session.id,
  }
  console.log('player BE', req.session.player)
  if (!req.session.player.originalSocket){
    req.session.player.originalSocket = req.body.socketId
  }
  res.send(req.session.player);
});

module.exports = router;
