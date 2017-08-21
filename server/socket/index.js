const store = require('../store');
const { addPlayer } = require('../store/player');
const { startGame, postAnswer, addPlayerToGame, addGame, switchToNextTurn, incrementScore} = require('../store/game');
const randStr = require('randomstring');


module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    // socket.join('Main');
    // socket.room = 'Main';

    //we need to emit back category and meme for when the host chooses to start the game
    socket.on('startGame', () => {
      let game = store.getState().game[socket.room]
      //let playerArray = game.gamePlayers.map(player => player.name)
      store.dispatch(startGame(socket.room))
      //console.log('stateski ', store.getState().game[socket.room])
      socket.emit('gameStarted', { meme: game.meme, category: game.category, judge: game.judge, gamePlayers: game.gamePlayers, turnNumber: game.turnNumber});
      socket.broadcast.to(socket.room).emit('gameStarted', { meme: game.meme, category: game.category, judge: game.judge, gamePlayers: game.gamePlayers, turnNumber: game.turnNumber });
    })


    //need to emit back the playerId to make a flag that the player answered on the front end
    //check if everybody answered, and if they did, emit something to the front that well let us know it's time for the judge to choose one
    socket.on('answerPosted', answer => {
      store.dispatch(postAnswer({
        gameId: socket.room,
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
      let currentState = store.getState().game[socket.room];

      //update answers real-time for answer submitted check
      socket.emit('playerAnswered', currentState.answers, true);
      socket.broadcast.to(socket.room).emit('playerAnswered', currentState.answers, false);

      if(currentState.gamePlayers.length - 1 === Object.keys(currentState.answers).length){
        socket.emit('gotAllAnswers', currentState.answers)
        socket.broadcast.to(socket.room).emit('gotAllAnswers', currentState.answers)
      }

    })

    //post to database, emit something that lets us know to render the winning meme for everybody
    //score++
    socket.on('winningMeme', playerId => {
      let winningAnswer = store.getState().game[socket.room].answers[playerId];
      store.dispatch(incrementScore({
        playerId: playerId,
        gameId: socket.room,
      }))
      socket.emit('roundFinishedJudge', winningAnswer);
      socket.broadcast.to(socket.room).emit('roundFinishedPlayer', winningAnswer);
    })

    //gotta send back all the new turn info (category and meme)
    socket.on('switchToNextTurn', something => {
      store.dispatch(switchToNextTurn(socket.room));
      setTimeout(() => {
        let game = store.getState().game[socket.room];
        //console.log('SWITCHGAME: ', game);
        io.sockets.in(socket.room).emit('gameStarted', { meme: game.meme, category: game.category, judge: game.judge, gamePlayers: game.gamePlayers, turnNumber: game.turnNumber });
        //socket.broadcast.to(socket.room).emit('gameStarted', { meme: game.meme, category: game.category, judge: game.judge, gamePlayers: game.gamePlayers, turnNumber: game.turnNumber });
      }, 5000)
      //socket.emit('nextTurn' {})
    })

    socket.on('createGame', ({ playerName, playerNum, categories, sessionId, activePlayer }) => {
      const code = randStr.generate(7);

      socket.emit('getCode', code);
      socket.leave('Main', () => {
        socket.room = code;
        socket.join(code, () => {

          store.dispatch(addPlayer({name: playerName, id: socket.id, sessionId: sessionId }));
          store.dispatch(addGame({gameId: code, host: {id: socket.id, name: playerName, score: 0, sessionId: sessionId, activePlayer: activePlayer }, categories: categories}));
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
      if(!rooms[code]) socket.emit('wrongCode', 'Room does not exist!');
      else if(rooms[code].gamePlayers.includes(socket.id)){
        socket.emit('alreadyInRoom', 'You are already in this room!');
      }
      else{
        store.dispatch(addPlayer({id: socket.id, name: playerName, sessionId }));
        store.dispatch(addPlayerToGame({player: { name: playerName, id: socket.id, score: 0, sessionId: sessionId, activePlayer: activePlayer }, gameId: code }));
        socket.playerName = playerName;
        socket.leave('Main', () => {
          socket.join(code, () => {
            console.log('gameStarted var', rooms[code].gameStarted)
            socket.room = code;
            socket.broadcast.to(code).emit('message', {body: playerName + ' has connected to this room', from: 'MemeBot'});
            socket.emit('correctRoom', rooms[code].host);
            socket.broadcast.to(socket.room).emit('replacedPlayers', store.getState().game[code].gamePlayers);
            socket.emit('replacedPlayers', store.getState().game[code].gamePlayers);
            if(rooms[code].gameStarted) socket.emit('lateAdd');
          });
        });

      }




    });


    socket.on('message', (body) => {
      console.log(`emmiting message from ${socket.id} to ${socket.room}`);
      socket.to(socket.room).emit('message', {
        body,
        from: socket.playerName
      })
    })


    socket.on('disconnect', () => {
      socket.leave(socket.room);
    })
  })
}
