const router = require('express').Router();

router.post('/', (req, res, next) => {
  req.session.room = req.body.room;
  req.session.activeRoom = true;
  res.send( {
    activeRoom: req.session.activeRoom,
    room: req.body.room,
  });
})

router.get('/', (req, res, next) => {
  console.log('req room:', req.session)
  res.send( { 
    activeRoom: req.session.activeRoom,
    room: req.session.room,
  });
});

router.delete('/', (req, res, next) => {
  req.session.room = null;
  req.session.activeRoom = false;
  res.send('room removed')
})

module.exports = router;
