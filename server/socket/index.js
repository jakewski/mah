const store = require('../store');
const addPlayerThunk = require('../store/player').addPlayerThunk;

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    store.dispatch(addPlayerThunk(socket.id));

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
