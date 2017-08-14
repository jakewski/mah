const store = require('../store');
const { addPlayerThunk } = require('../store/player');
const { addPlayerToGameThunk, addGameThunk, switchToNextTurnThunk } = require('../store/game');
const randStr = require('randomstring');


module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    // socket.join('Main');
    // socket.room = 'Main';

    socket.on('createGame', game => {
      const code = randStr.generate(7);
      
      socket.emit('getCode', code);
      socket.leave('Main', () => {
        socket.room = code;
        socket.join(code, () => {
          store.dispatch(addPlayerThunk({name: game.playerName, id: socket.id}));
          store.dispatch(addGameThunk({gameId: code, host: {id: socket.id, name: game.playerName}, categories: game.categories, playerNum: game.playerNum}))

        });

      });
    })

    socket.on('setPlayerName', name => {
      socket.playerName = name;
    })

    socket.on('switchToNextTurn', something => {
      store.dispatch(switchToNextTurnThunk(socket.room));
    })
    
    socket.on('switchToMain', () => {
      socket.leave(socket.room, () => {
        socket.room = 'Main';
        socket.join('Main');

      });
    })

    // socket.on('addPlayerToGame', gameId => {
    //   store.dispatch(addPlayerToGameThunk({playerId: socket.id, gameId: gameId}))
    // })
    socket.on('replacePlayers', players => {
      socket.broadcast.to(socket.room).emit('replacedPlayers', players);
    })

    socket.on('addPlayertoRoom', playerInfo => {
      const rooms = store.getState().game;
      //socket.room = playerInfo.code;
      if(!rooms[playerInfo.code]) socket.emit('wrongCode', 'ya done fucked up sonny');
      else if(rooms[playerInfo.code].gamePlayers.includes(socket.id)){
        socket.emit('alreadyInRoom', 'you are already in this room')
      }
      else{

        store.dispatch(addPlayerThunk({id: socket.id, name: playerInfo.playerName}));
        store.dispatch(addPlayerToGameThunk({player: {name: playerInfo.playerName, id: socket.id}, gameId: playerInfo.code}))
        socket.playerName = playerInfo.playerName;
        socket.leave('Main', () => {
          socket.join(playerInfo.code, () => {
            socket.room = playerInfo.code;
            socket.broadcast.to(playerInfo.code).emit('message', {body: playerInfo.playerName + ' has connected to this room', from: 'MemeBot'});
            socket.emit('correctRoom');
            socket.to(socket.room).emit('replacedPlayers', store.getState().game[playerInfo.code].gamePlayers)
            socket.emit('replacedPlayers', store.getState().game[playerInfo.code].gamePlayers)
    

          });
        });

      }

      
      

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

    socket.on('message', ( body ) => {
      console.log(`emmiting message from ${socket.id} to ${socket.room}`);
      socket.to(socket.room).emit('message', {
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
