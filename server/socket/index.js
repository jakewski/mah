const store = require('../store');
const { addPlayer } = require('../store/player');
const { postAnswer, addPlayerToGame, addGame, switchToNextTurn, incrementScore} = require('../store/game');
const randStr = require('randomstring');
const axios = require('axios');


module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    //we need to emit back category and meme for when the host chooses to start the game
    socket.on('startGame', (room) => {
      let game = store.getState().game[room]
      //let playerArray = game.gamePlayers.map(player => player.name)

      socket.emit('gameStarted', { meme: game.meme, category: game.category, judge: game.judge, gamePlayers: game.gamePlayers, turnNumber: game.turnNumber});
      socket.broadcast.to(room).emit('gameStarted', { meme: game.meme, category: game.category, judge: game.judge, gamePlayers: game.gamePlayers, turnNumber: game.turnNumber });
    })


    //need to emit back the playerId to make a flag that the player answered on the front end
    //check if everybody answered, and if they did, emit something to the front that well let us know it's time for the judge to choose one
    socket.on('answerPosted', answerAndRoom => {
      let answer = answerAndRoom.answer
      store.dispatch(postAnswer({
        gameId: answerAndRoom.room,
        playerId: socket.id,
        topText: answer.topText,
        topXcoord: answer.topXcoord,
        topYcoord: answer.topYcoord,
        topFontSize: answer.topFontSize,
        bottomText: answer.bottomText,
        bottomXcoord: answer.bottomXcoord,
        bottomYcoord: answer.bottomYcoord,
        bottomFontSize: answer.bottomFontSize,
        memeUrl: answer.memeUrl
      }))
      let currentState = store.getState().game[answerAndRoom.room];
      //update answers real-time for answer submitted check
      socket.emit('playerAnswered', currentState.answers, true);
      socket.broadcast.to(answerAndRoom.room).emit('playerAnswered', currentState.answers, false);

      if(currentState.gamePlayers.length - 1 === Object.keys(currentState.answers).length){
        socket.emit('gotAllAnswers', currentState.answers)
        socket.broadcast.to(answerAndRoom.room).emit('gotAllAnswers', currentState.answers)
      }

    })

    //post to database, emit something that lets us know to render the winning meme for everybody
    //score++
    socket.on('winningMeme', playerIdAndRoom => {
      let winningAnswer = store.getState().game[playerIdAndRoom.room].answers[playerIdAndRoom.key];
      store.dispatch(incrementScore({
        playerId: playerIdAndRoom.key,
        gameId: playerIdAndRoom.room,
      }))
      socket.emit('roundFinishedJudge', winningAnswer);
      socket.broadcast.to(playerIdAndRoom.room).emit('roundFinishedPlayer', winningAnswer);
    })

    //gotta send back all the new turn info (category and meme)
    socket.on('switchToNextTurn', room => {
      store.dispatch(switchToNextTurn(room));
      setTimeout(() => {
        let game = store.getState().game[room];
        //console.log('SWITCHGAME: ', game);
        io.sockets.emit('gameStarted', { meme: game.meme, category: game.category, judge: game.judge, gamePlayers: game.gamePlayers, turnNumber: game.turnNumber });
        //socket.broadcast.to(socket.room).emit('gameStarted', { meme: game.meme, category: game.category, judge: game.judge, gamePlayers: game.gamePlayers, turnNumber: game.turnNumber });
      }, 5000)
      //socket.emit('nextTurn' {})
    })

    socket.on('createGame', ({ playerName, playerNum, categories, sessionId, activePlayer, gameStarted }) => {
      const code = randStr.generate(7);

      socket.emit('getCode', code);
      socket.leave('main', () => {
        socket.room = code;
        socket.join(code, () => {

          store.dispatch(addPlayer({name: playerName, id: socket.id, sessionId: sessionId }));
          store.dispatch(addGame({gameId: code, host: {id: socket.id, name: playerName, score: 0, sessionId: sessionId, activePlayer: activePlayer }, categories, gameStarted}));
        });
      });
    })

    socket.on('setPlayerName', name => {
      socket.playerName = name;
    })


    socket.on('switchToMain', (room) => {
      console.log('error right here?')
      axios.post('/api/room', {room: 'main'})
      console.log('or after?')
      socket.leave(room)
      console.log('or here?')
      socket.join('main');
    })
    socket.on('getGameState', (room) => {
      if (store.getState().game[room]) {
      socket.leave('main')
      socket.join(room)
      socket.emit('recievePlayers', store.getState().game[room].gamePlayers)
      }
    })

    // socket.on('addPlayerToGame', gameId => {
    //   store.dispatch(addPlayerToGame({playerId: socket.id, gameId: gameId}))
    // })
    socket.on('replacePlayers', playersAndRoom => {
      socket.broadcast.to(playersAndRoom.room).emit('replacedPlayers', playersAndRoom.players);
    })
    socket.on('addPlayertoRoom', ({ code, playerName, sessionId, activePlayer }) => {
      const rooms = store.getState().game;
      //socket.room = code;
      if(!rooms[code]) socket.emit('wrongCode', 'Room does not exist!');
      else if(rooms[code].gamePlayers.includes(socket.id)){
        socket.emit('alreadyInRoom', 'You are already in this room!');
      }
      else{
        store.dispatch(addPlayer({id: socket.id, name: playerName, sessionId }));
        store.dispatch(addPlayerToGame({player: { name: playerName, id: socket.id, score: 0, sessionId: sessionId, activePlayer: activePlayer }, gameId: code }));
        socket.playerName = playerName;
        socket.leave('main', () => {
          socket.join(code, () => {
            socket.room = code;
            socket.broadcast.to(code).emit('message', {body: playerName + ' has connected to this room', from: 'MemeBot'});
            socket.emit('correctRoom', rooms[code].host);
            socket.broadcast.to(code).emit('replacedPlayers', store.getState().game[code].gamePlayers);
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


    socket.on('message', ({body, room, from}) => {
      console.log(`emmiting message from ${socket.id} to ${room}`);
      console.log('wit a body of:', body)
      socket.to(room).emit('message', {
        body,
        from,
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
      console.dir('socketyo',socket)

      //io.sockets.emit('updatePlayers', players);
      // socket.broadcast.emit('message', {body: socket.playerName + ' has disconnected', from:'server'});
      socket.leave(socket.room);
    })
  })
}
