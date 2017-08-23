const router = require('express').Router();

router.post('/', (req, res, next) => {
  req.session.room = req.body.room;
  req.session.activeRoom = true;
  res.status(202).send( {
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

router.delete('/', (req, res, next) => {
  req.session.room = null;
  req.session.activeRoom = false;
  res.sendStatus(204)
})

module.exports = router;
