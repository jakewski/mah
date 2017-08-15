const R = require("ramda");
const { Meme } = require("../db/models");
const ADD_GAME = "ADD_GAME";
const REMOVE_GAME = "REMOVE_GAME";
const ADD_PLAYER_TO_GAME = "ADD_PLAYER_TO_GAME";
const SWITCH_TO_NEXT_TURN = "SWITCH_TO_NEXT_TURN";
const POST_ANSWER = 'POST_ANSWER'
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
        currentTurn: {
            category: '',
            judge: {},
            turnNumber: 0,
            meme: '', 
            answers: {
                playerId: their answer
            }
        },
    }
}
*/

const postAnswer = answer => ({ type: POST_ANSWER, answer })
const addGame = game => ({ type: ADD_GAME, game });
const removeGame = game => ({ type: REMOVE_GAME, game });
const addPlayerToGame = playerToGame => ({
  type: ADD_PLAYER_TO_GAME,
  playerToGame
});
//switchToNextTurn action will assign a random category and meme
const switchToNextTurn = gameId => ({ type: SWITCH_TO_NEXT_TURN, gameId });

const switchToNextTurnThunk = gameId => dispatch =>{
  dispatch(switchToNextTurn(gameId))
}

const addGameThunk = game => dispatch => {
  dispatch(addGame(game));
};

const postAnswerThunk = game => dispatch => {
  dispatch(postAnswer(game));
};

const addPlayerToGameThunk = playerToGame => dispatch => {
  dispatch(addPlayerToGame(playerToGame));
};

const grabRandomMeme = () => {
  return memes[Math.floor(Math.random() * memes.length)];
};
const grabRandomCategory = categories =>
  categories[Math.floor(Math.random() * categories.length)];

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case ADD_GAME:
      let obj1 = {};
      let meme = grabRandomMeme();
      let currentTurn = {
        category: grabRandomCategory(action.game.categories),
        judge: action.game.host,
        turnNumber: 0,
        meme: {image: meme.image, text: meme.text},
        answers: {}
      };
      obj1[action.game.gameId] = {
        host: action.game.host,
        gamePlayers: [action.game.host],
        categories: action.game.categories,
        currentTurn: currentTurn,
        playerNum: action.game.playerNum
      };
      return Object.assign({}, state, obj1);

    case REMOVE_GAME:
      let obj2 = R.clone(state);
      obj2[action.game.gameId] = undefined;
      return obj2;

    case ADD_PLAYER_TO_GAME:
      let obj3 = R.clone(state);
      obj3[action.playerToGame.gameId].gamePlayers.push(
        action.playerToGame.player
      );
      return obj3;

    case SWITCH_TO_NEXT_TURN:
      let thisGame = R.clone(state[action.gameId]);
      let meme2 = grabRandomMeme();
      let nextTurn = {
        category: grabRandomCategory(thisGame.categories),
        judge: thisGame.gamePlayers[++thisGame.currentTurn.turnNumber % thisGame.playerNum],
        turnNumber: thisGame.currentTurn.turnNumber,
        meme: {image: meme2.image, text: meme2.text},
        answers: {},
      };
      thisGame.currentTurn = nextTurn;
      let obj4 = {};
      obj4[action.gameId] = thisGame;
      return Object.assign({}, state, obj4);

    case POST_ANSWER:
      //this might have bugs
      let thisGame2 = R.clone(state[action.answer.gameId]);
      let tempAnswer = {};
      tempAnswer[action.answer.playerId] = action.answer.text;
      thisGame2.currentTurn.answers = Object.assign({}, thisGame2.currentTurn.answers, tempAnswer)
      let obj6 = {};
      obj6[action.answer.gameId] = thisGame2;
      return Object.assign({}, state, obj6);

    default:
      return state;
  }
};

module.exports = { addPlayerToGameThunk, addGameThunk, reducer, switchToNextTurnThunk };
