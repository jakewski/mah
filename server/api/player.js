const router = require('express').Router();


router.post('/set', (req, res, next) => {
  req.session.name = req.body.name;
  req.session.socketId = req.body.id;
  req.session.activePlayer = true;
  req.session.sessionId = req.session.id
  res.send( {
    name: req.session.name,
    socketId: req.session.socketId,
    activePlayer: true,
    sessionId: req.session.id,
  });
})


router.get('/me', (req, res, next) => {
  // console.log('req session here', req.session.player)
  // req.session.player = {
  //   // name: req.body.name,
  //   socketId: req.body.socketId,
  //   sessionId: req.session.id,
  // }
  // if (!req.session.player.originalSocket){
  //   req.session.player.originalSocket = req.body.socketId
  // }
  // res.send(req.session.player);
  // req.session.activePlayer = true;
  // req.session.name = req.body.name;
  // req.session.socketId = req.body.id;
  console.log('sessssion', req.session)
  res.send( { 
    sessionId: req.session.id,
    name: req.body.name,
    socketId: req.body.id,
  });
});

router.get('/check', (req, res, next) => {
  if(req.session.activePlayer){
    res.send(true);
  } else {
    res.send(false);
  }
})

module.exports = router;
