
var rooms = ['Lobby'];

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('addPlayer', function(playerName) {
      socket.room = 'Lobby';

      //call addPlayer thunk here

      socket.playerName = playerName;
      socket.join('Lobby');
      socket.emit('message', 'SERVER', 'you have connected to Lobby');
      socket.broadcast.to('Lobby').emit('message', 'SERVER', playerName + ' has connected to this room');
      socket.emit('updateRooms', rooms, 'Lobby');
    });

    socket.on('createRoom ', function(room) {
        //call addRoom thunk here
        //rooms.push(room);
        socket.emit('updateRooms', rooms, socket.room);
    });

    socket.on('startGame', () => {
      //game thunks here
    })

    socket.on('message', body => {
      socket.broadcast.emit('message', {
        body,
        from: socket.playerName
      })
    })

    socket.on('sendChat', function(data) {
        io.sockets["in"](socket.room).emit('message', {
        body,
        from: socket.playerName
      })
    });

    socket.on('switchRoom', function(newRoom) {
        var oldRoom;
        oldRoom = socket.room;
        socket.leave(socket.room);
        socket.join(newRoom);
        socket.emit('message', 'SERVER', 'you have connected to ' + newRoom);
        socket.broadcast.to(oldRoom).emit('message', 'SERVER', socket.playerName + ' has left this room');
        socket.room = newRoom;
        socket.broadcast.to(newRoom).emit('message', 'SERVER', socket.playerName + ' has joined this room');
        socket.emit('updateRooms', rooms, newRoom);
    });

    // socket.on('submitAnswer', payload => {
    //   console.log(payload.answer);
    // })


    socket.on('disconnect', () => {
      //delete players[socket.playerName]
      //call deletePlayer thunk here

      io.sockets.emit('updatePlayers', players);
      socket.broadcast.emit('message', 'SERVER', socket.playerName + ' has disconnected');
      socket.leave(socket.room);
    })
  })
}
