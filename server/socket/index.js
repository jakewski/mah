const store = require('../store');
const { addPlayer } = require('../store/player');
const { postAnswer, addPlayerToGame, addGame, switchToNextTurn } = require('../store/game');
const randStr = require('randomstring');


module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    // socket.join('Main');
    // socket.room = 'Main';

    //we need to emit back category and meme for when the host chooses to start the game
    socket.on('startGame', () => {
      let game = store.getState().game[socket.room]
      let playerArray = game.gamePlayers.map(player => player.name)

      socket.emit('gameStarted', { meme: game.meme, category: game.category, judge: game.judge, playerNames: playerArray });
      socket.broadcast.to(socket.room).emit('gameStarted', { meme: game.meme, category: game.category, judge: game.judge, playerNames: playerArray });
    })


    //need to emit back the playerId to make a flag that the player answered on the front end
    //check if everybody answered, and if they did, emit something to the front that well let us know it's time for the judge to choose one
    socket.on('answerPosted', answer => {
      store.dispatch(postAnswer({
        gameId: socket.room,
        text: answer,
        playerId: socket.id,
      }))
      let currentState = store.getState().game[socket.room];
      socket.emit('playerAnswered');
      socket.broadcast.to(socket.room).emit('playerAnswered');
      if(currentState.gamePlayers.length - 1 === Object.keys(currentState.answers).length){
        socket.emit('gotAllAnswers', currentState.answers)
        socket.broadcast.to(socket.room).emit('gotAllAnswers', currentState.answers)
      }

    })

    //post to database, emit something that lets us know to render the winning meme for everybody
    //score++
    socket.on('winningMeme', playerId => {
      let winningAnswer = store.getState().game[socket.room].answers[playerId];
      socket.emit('roundFinished', winningAnswer)
    })

    //gotta send back all the new turn info (category and meme)
    socket.on('switchToNextTurn', something => {
      store.dispatch(switchToNextTurn(socket.room));
      //socket.emit('nextTurn' {})
    })

    socket.on('createGame', ({ playerName, playerNum, categories, sessionId, activePlayer }) => {
      const code = randStr.generate(7);

      socket.emit('getCode', code);
      socket.leave('Main', () => {
        socket.room = code;
        socket.join(code, () => {

          store.dispatch(addPlayer({name: playerName, id: socket.id, sessionId: sessionId }));
          store.dispatch(addGame({gameId: code, host: {id: socket.id, name: playerName, score: 0, sessionId: sessionId, activePlayer: activePlayer }, categories: categories, playerNum: playerNum}));
          store.dispatch(addPlayer({name: playerName, id: socket.id}));
          store.dispatch(addGame({gameId: code, host: {id: socket.id, name: playerName, score: 0}, categories: categories, playerNum: playerNum}));
        });
      });
    })

    socket.on('setPlayerName', name => {
      socket.playerName = name;
    })


    socket.on('switchToMain', () => {
      socket.leave(socket.room, () => {
        socket.room = 'Main';
        socket.join('Main');

      });
    })

    // socket.on('addPlayerToGame', gameId => {
    //   store.dispatch(addPlayerToGame({playerId: socket.id, gameId: gameId}))
    // })
    socket.on('replacePlayers', players => {
      socket.broadcast.to(socket.room).emit('replacedPlayers', players);
    })
    socket.on('addPlayertoRoom', ({ code, playerName, sessionId, activePlayer }) => {
      const rooms = store.getState().game;
      //socket.room = code;
      if(!rooms[code]) socket.emit('wrongCode', 'ya done fucked up sonny');
      else if(rooms[code].gamePlayers.includes(socket.id)){
        socket.emit('alreadyInRoom', 'you are already in this room');
      }
      else{
        store.dispatch(addPlayer({id: socket.id, name: playerName, sessionId }));
        store.dispatch(addPlayerToGame({player: { name: playerName, id: socket.id, score: 0, sessionId: sessionId, activePlayer: activePlayer }, gameId: code }));
        socket.playerName = playerName;
        socket.leave('Main', () => {
          socket.join(code, () => {
            socket.room = code;
            socket.broadcast.to(code).emit('message', {body: playerName + ' has connected to this room', from: 'MemeBot'});
            socket.emit('correctRoom', rooms[code].host);
            socket.broadcast.to(socket.room).emit('replacedPlayers', store.getState().game[code].gamePlayers);
            socket.emit('replacedPlayers', store.getState().game[code].gamePlayers);
          });
        });

      }




    });

    // socket.on('createRoom ', function(room) {
    //     //call addRoom  here
    //     //rooms.push(room);
    //     const code = randStr.generate(7);
    //     store.dispatch()
    //     //socket.emit('updateRooms', rooms, socket.room);
    // });


    socket.on('message', (body) => {
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
      //call deletePlayer  here

      //io.sockets.emit('updatePlayers', players);
      // socket.broadcast.emit('message', {body: socket.playerName + ' has disconnected', from:'server'});
      socket.leave(socket.room);
    })
  })
}
