const store = require('../store');
const { addPlayerThunk } = require('../store/player');
const { addPlayerToGameThunk, addGameThunk } = require('../store/game');


var rooms = ['Main'];

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

    socket.on('addPlayertoRoom', function(playerName) {
      socket.room = 'Main';

      //call addPlayer thunk here

      socket.playerName = playerName;
      socket.join('Main');
      socket.emit('message', {body: 'you have connected to Main', from: 'server'});
      socket.broadcast.to('Main').emit('message', {body: playerName + ' has connected to this room', from: 'server'});
      socket.emit('updateRooms', rooms, 'Main');
    });

    // socket.on('createRoom ', function(room) {
    //     //call addRoom thunk here
    //     //rooms.push(room);
    //     socket.emit('updateRooms', rooms, socket.room);
    // });

    // socket.on('startGame', () => {
    //   //game thunks here
    // })

    socket.on('message', body => {
      socket.broadcast.emit('message', {
        body,
        from: socket.playerName
      })
    })

    // socket.on('sendChat', function(data) {
    //     io.sockets["in"](socket.room).emit('message', {
    //     body,
    //     from: socket.playerName
    //   })
    // });

    // socket.on('switchRoom', function(newRoom) {
    //     var oldRoom;
    //     oldRoom = socket.room;
    //     socket.leave(socket.room);
    //     socket.join(newRoom);
    //     socket.emit('message', 'SERVER', 'you have connected to ' + newRoom);
    //     socket.broadcast.to(oldRoom).emit('message', 'SERVER', socket.playerName + ' has left this room');
    //     socket.room = newRoom;
    //     socket.broadcast.to(newRoom).emit('message', 'SERVER', socket.playerName + ' has joined this room');
    //     socket.emit('updateRooms', rooms, newRoom);
    // });

    // socket.on('submitAnswer', payload => {
    //   console.log(payload.answer);
    // })

    socket.on('disconnect', () => {
      //delete players[socket.playerName]
      //call deletePlayer thunk here

      //io.sockets.emit('updatePlayers', players);
      // socket.broadcast.emit('message', {body: socket.playerName + ' has disconnected', from:'server'});
      socket.leave(socket.room);
    })
  })
}
