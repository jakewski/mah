const R = require("ramda");
const { Meme } = require("../db/models");
const ADD_GAME = "ADD_GAME";
const REMOVE_GAME = "REMOVE_GAME";
const ADD_PLAYER_TO_GAME = "ADD_PLAYER_TO_GAME";
const SWITCH_TO_NEXT_TURN = "SWITCH_TO_NEXT_TURN";
const POST_ANSWER = 'POST_ANSWER';
const INCREMENT_SCORE = 'INCREMENT_SCORE';
//on the backend we store all of our players, on the front end we will store the current player
const initialState = {};
let memes; 
Meme.findAll().then(stuff => memes = stuff);

/*
{
    gameId: {
        host: {},
        gamePlayers: [],
        categories: [],
        playerNum: NaN,
        currentTurn: turnId,
        category: '',
        judge: {},
        turnNumber: 0,
        meme: '', 
        answers: {
            playerId: their answer
        }
    },
}
*/

const postAnswer = answer => ({ type: POST_ANSWER, answer })
const addGame = game => ({ type: ADD_GAME, game });
const removeGame = game => ({ type: REMOVE_GAME, game });
const addPlayerToGame = playerToGame => ({
  type: ADD_PLAYER_TO_GAME,
  playerToGame
});

const incrementScore = game => ({ type: INCREMENT_SCORE, game});
//switchToNextTurn action will assign a random category and meme
const switchToNextTurn = gameId => ({ type: SWITCH_TO_NEXT_TURN, gameId });

const grabRandomMeme = () => {
  return memes[Math.floor(Math.random() * memes.length)];
};
const grabRandomCategory = categories =>
  categories[Math.floor(Math.random() * categories.length)];

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case ADD_GAME:
      let newGame = {};
      let meme = grabRandomMeme();
      newGame[action.game.gameId] = {
        host: action.game.host,
        gamePlayers: [action.game.host],
        categories: action.game.categories,
        playerNum: action.game.playerNum,
        category: grabRandomCategory(action.game.categories),
        judge: action.game.host,
        turnNumber: 0,
        meme: {image: meme.image, text: meme.text},
        answers: {}
      };
      return Object.assign({}, state, newGame);

    case REMOVE_GAME:
      let deletedGame = {};
      deletedGame[action.game.gameId] = undefined;
      return Object.assign({}, state, deletedGame);

    case ADD_PLAYER_TO_GAME:
      let addedPlayer = {
        gamePlayers: [...state[action.playerToGame.gameId].gamePlayers, action.playerToGame.player]
      }
      let gameWithPlayer = {};
      gameWithPlayer[action.playerToGame.gameId] = Object.assign({}, state[action.playerToGame.gameId], addedPlayer);
      return Object.assign({}, state, gameWithPlayer);

    case SWITCH_TO_NEXT_TURN:
      let gameWithNewTurn = {};
      let meme2 = grabRandomMeme();
      //console.log('switch state:', state);
      let nextTurn = {
        category: grabRandomCategory(state[action.gameId].categories),
        judge: state[action.gameId].gamePlayers[state[action.gameId].turnNumber + 1 % state[action.gameId].playerNum],
        turnNumber: state[action.gameId].turnNumber + 1,
        meme: {image: meme2.image, text: meme2.text},
        answers: {},
      };
      let newTurnObject = Object.assign({}, state[action.gameId], nextTurn);
      gameWithNewTurn[action.gameId] = newTurnObject;
      return Object.assign({}, state, gameWithNewTurn);

    case POST_ANSWER:
      //this might have bugs

      let tempAnswer = {};
      tempAnswer[action.answer.playerId] = action.answer.text;
      let newAnswers = Object.assign({}, state[action.answer.gameId].answers, tempAnswer);
      let updatedAnswers = { 
        answers: newAnswers 
      };
      let updatedGame = {};
      updatedGame[action.answer.gameId] = Object.assign({}, state[action.answer.gameId], updatedAnswers);

      return Object.assign({}, state, updatedGame);

    case INCREMENT_SCORE:
      let newGamePlayers = R.clone(state[action.game.gameId].gamePlayers);
      newGamePlayers = newGamePlayers.map(player => {
        if(player.id === action.game.playerId) {
          ++player.score;
        }
        return player;
      })
      let innerGamePlayers = {gamePlayers: newGamePlayers}
      let newThang = {};
      newThang[action.game.gameId] = Object.assign({}, state[action.game.gameId], innerGamePlayers);
      //console.log('NEWTHANG', newThang);
      return Object.assign({}, state, newThang);
    default:
      return state;
  }
};

module.exports = { addPlayerToGame, addGame, reducer, switchToNextTurn, postAnswer, incrementScore };
