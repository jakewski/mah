const store = require('../store');
const { addPlayerThunk } = require('../store/player');
const { addPlayerToGameThunk, addGameThunk } = require('../store/game');
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.on('createGame', gameId => {
      console.log('game created')
      store.dispatch(addPlayerThunk(socket.id));
      store.dispatch(addGameThunk({gameId: gameId, host: socket.id}))
      console.log(store.getState());
    })

    socket.on('addPlayerToGame', gameId => {
      store.dispatch(addPlayerThunk(socket.id));
      store.dispatch(addPlayerToGameThunk({playerId: socket.id, gameId: gameId}))
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
