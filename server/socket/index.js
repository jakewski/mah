const store = require('../store');
const { addPlayerThunk } = require('../store/player');
const { addPlayerToGameThunk, addGameThunk } = require('../store/game');
const randStr = require('randomstring');

var rooms = store.getState().game;
console.log('ROOMS',rooms);

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('createGame', game => {
      const code = randStr.generate(7);
      
      socket.emit('getCode', code);

      console.log('game created')
      store.dispatch(addPlayerThunk({id: socket.id, name: game.playerName}));
      store.dispatch(addGameThunk({gameId: code, host: socket.id, categories: game.categories, playerNum: game.playerNum}))
      console.log(store.getState().game);
    })

    socket.on('addPlayerToGame', gameId => {
      store.dispatch(addPlayerToGameThunk({playerId: socket.id, gameId: gameId}))
    })

    socket.on('addPlayertoRoom', function(playerName) {
      socket.room = 'Main';

      store.dispatch(addPlayerThunk({id: socket.id, name: playerName}));

      socket.playerName = playerName;
      socket.join('Main');
      socket.emit('message', {body: 'you have connected to Main', from: 'server'});
      socket.broadcast.to('Main').emit('message', {body: playerName + ' has connected to this room', from: 'server'});
      socket.emit('updateRooms', rooms, 'Main');

      console.log(store.getState());
    });

    // socket.on('createRoom ', function(room) {
    //     //call addRoom thunk here
    //     //rooms.push(room);
    //     const code = randStr.generate(7);
    //     store.dispatch()
    //     //socket.emit('updateRooms', rooms, socket.room);
    // });

    socket.on('startGame', (gameInfo) => {
      store.dispatch(addGameThunk(gameInfo));
    })

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
