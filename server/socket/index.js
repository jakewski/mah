const store = require("../store");
const { addPlayer } = require("../store/player");
const { postAnswer, addPlayerToGame, addGame, switchToNextTurn, incrementScore, updateGame } = require("../store/game");
const randStr = require("randomstring");
const axios = require("axios");

module.exports = io => {
  io.on("connection", socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`);

    const gameTimer = currentTimer => {
      clearInterval(socket.tick);
        socket.tick = setInterval(() => {
          if (currentTimer > 0) io.sockets.in(socket.room).emit("setTimer", (currentTimer -= 1000) / 1000);
          else {
            let currentState = store.getState().game[socket.room];
            io.sockets.in(socket.room).emit("gotAllAnswers", currentState.answers)
            io.sockets.in(socket.room).emit("timeout");
            clearInterval(socket.tick);
          }
        }, 1000);
    }

    //we need to emit back category and meme for when the host chooses to start the game
    socket.on("startGame", room => {
      let allState = store.getState();
      let gameState = allState.game;
      let game = gameState[room];
      if (!game) {
        console.log("error! no game to connect to");
        return { error: "game room error" };
      }
      //let playerArray = game.gamePlayers.map(player => player.name)
      store.dispatch(updateGame({ room: room, game: { gameStarted: true } }));

      socket.emit("gameStarted", {
        meme: game.meme,
        category: game.category,
        judge: game.judge,
        gamePlayers: game.gamePlayers,
        turnNumber: game.turnNumber
      });
      socket.broadcast.to(room).emit("gameStarted", {
        meme: game.meme,
        category: game.category,
        judge: game.judge,
        gamePlayers: game.gamePlayers,
        turnNumber: game.turnNumber
      });

    });

    socket.on("clearTick", () => {
      clearInterval(socket.tick);
    })

    socket.on("startTick", () => {
      gameTimer(20000);
    })

    //need to emit back the playerId to make a flag that the player answered on the front end
    //check if everybody answered, and if they did, emit something to the front that well let us know it's time for the judge to choose one
    socket.on("answerPosted", answerAndRoom => {
      let answer = answerAndRoom.answer;
      store.dispatch(
        postAnswer({
          gameId: answerAndRoom.room,
          playerId: answerAndRoom.sessionId,
          topText: answer.topText,
          topXcoord: answer.topXcoord,
          topYcoord: answer.topYcoord,
          topFontSize: answer.topFontSize,
          bottomText: answer.bottomText,
          bottomXcoord: answer.bottomXcoord,
          bottomYcoord: answer.bottomYcoord,
          bottomFontSize: answer.bottomFontSize,
          memeUrl: answer.memeUrl
        })
      );
      let currentState = store.getState().game[answerAndRoom.room];
      //update answers real-time for answer submitted check
      socket.emit("playerAnswered", currentState.answers, true);
      socket.broadcast.to(answerAndRoom.room).emit("playerAnswered", currentState.answers, false);

      if (currentState.gamePlayers.length - 1 === Object.keys(currentState.answers).length) {
        store.dispatch(
          updateGame({
            room: answerAndRoom,
            game: { allAnswersSubmitted: true }
          })
        );
        io.sockets.in(answerAndRoom.room).emit("gotAllAnswers", currentState.answers);
      }
    });

    //post to database, emit something that lets us know to render the winning meme for everybody
    //score++
    socket.on("winningMeme", playerIdAndRoom => {
      let winningAnswer = store.getState().game[playerIdAndRoom.room].answers[playerIdAndRoom.key];
      store.dispatch(
        incrementScore({
          playerId: playerIdAndRoom.key,
          gameId: playerIdAndRoom.room
        })
      );

      socket.broadcast.to(playerIdAndRoom.room).emit("roundFinishedPlayer", winningAnswer);
      socket.emit("roundFinishedJudge", winningAnswer)
    });

    //gotta send back all the new turn info (category and meme)
    socket.on("switchToNextTurn", (room, skipWinner) => {

      store.dispatch(switchToNextTurn(room));
      //skipWinner boolean attached to manual no memes submitted button to switch to next round without pausing 5 seconds for winner screen
      let timeout = 3000;
      if (skipWinner) {
        timeout = 0;
      }

      setTimeout(() => {
        let game = store.getState().game[room];
        io.sockets.in(room).emit("gameStarted", {
          meme: game.meme,
          category: game.category,
          judge: game.judge,
          gamePlayers: game.gamePlayers,
          turnNumber: game.turnNumber
        });
      }, timeout);
    });

    socket.on("createGame", ({ playerName, playerNum, categories, sessionId, activePlayer, gameStarted }) => {
      const code = randStr.generate(4);

      socket.emit("getCode", code);
      socket.leave("main", () => {
        socket.room = code;
        socket.join(code, () => {
          store.dispatch(
            addPlayer({
              name: playerName,
              id: socket.id,
              sessionId: sessionId
            })
          );
          store.dispatch(
            addGame({
              gameId: code,
              host: {
                id: socket.id,
                name: playerName,
                score: 0,
                sessionId: sessionId,
                activePlayer: activePlayer
              },
              categories,
              gameStarted
            })
          );
        });
      });
    });

    socket.on("setPlayerName", name => {
      socket.playerName = name;
    });

    socket.on("switchToMain", room => {
      if (room !== "main") socket.leave(room, () => socket.join("main"));
      else socket.join("main");
    });

    socket.on("switchToRoom", room => {
      socket.leave(socket.room, () => socket.join(room));
    });

    socket.on("getGameState", room => {
      if (store.getState().game[room]) {
        socket.leave("main", () => socket.join(room));
        socket.emit("recieveGameState", store.getState().game[room]);
      }
    });

    // socket.on('addPlayerToGame', gameId => {
    //   store.dispatch(addPlayerToGame({playerId: socket.id, gameId: gameId}))
    // })
    socket.on("replacePlayers", playersAndRoom => {
      socket.broadcast.to(playersAndRoom.room).emit("replacedPlayers", playersAndRoom.players);
    });
    socket.on("addPlayertoRoom", ({ code, playerName, sessionId, activePlayer }) => {
      const rooms = store.getState().game;
      //socket.room = code;
      if (!rooms[code]) socket.emit("wrongCode", "Room does not exist!");
      else if (rooms[code].gamePlayers.includes(socket.id)) {
        socket.emit("alreadyInRoom", "You are already in this room!");
      } else {
        store.dispatch(addPlayer({ id: socket.id, name: playerName, sessionId }));
        store.dispatch(
          addPlayerToGame({
            player: {
              name: playerName,
              id: socket.id,
              score: 0,
              sessionId: sessionId,
              activePlayer: activePlayer
            },
            gameId: code
          })
        );
        socket.playerName = playerName;
        socket.leave("main", () => {
          socket.join(code, () => {
            socket.room = code;
            socket.broadcast.to(code).emit("message", {
              body: playerName + " has connected to this room",
              from: "MemeBot"
            });
            socket.emit("correctRoom", rooms[code].host);
            socket.broadcast.to(code).emit("replacedPlayers", store.getState().game[code].gamePlayers);
            socket.emit("replacedPlayers", store.getState().game[code].gamePlayers);
          });
        });
      }
    });

    socket.on("message", ({ body, room, from }) => {
      console.log(`emmiting message from ${socket.id} to ${room}`);
      socket.to(room).emit("message", {
        body,
        from
      });
    });

    socket.on("disconnect", () => {
      socket.leave(socket.room);
    });
  });
};
