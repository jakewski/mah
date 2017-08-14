const R = require('ramda');
const ADD_GAME = 'ADD_GAME'
const REMOVE_GAME = 'REMOVE_GAME'
const ADD_PLAYER_TO_GAME = 'ADD_PLAYER_TO_GAME'
const SWITCH_TO_NEXT_TURN = 'SWITCH_TO_NEXT_TURN'
//on the backend we store all of our players, on the front end we will store the current player
const initialState = {}

const addGame = game => ({ type: ADD_GAME, game });
const removeGame = game => ({ type: REMOVE_GAME, game });
const addPlayerToGame = playerToGame => ({ type: ADD_PLAYER_TO_GAME, playerToGame});
const switchToNextTurn = nextTurn => ({ type: SWITCH_TO_NEXT_TURN, nextTurn })
const addGameThunk = game => dispatch => {
    dispatch(addGame(game));
}

const addPlayerToGameThunk = playerToGame => dispatch => {
    dispatch(addPlayerToGame(playerToGame));
}

const reducer = function (state = initialState, action){
    switch (action.type){
        case ADD_GAME:
            let obj1 = {};
            let currentTurn = { category: '', judge: action.game.host, turnNumber: 0, meme: '', answers: [] }
            obj1[action.game.gameId] = { gamePlayers: [action.game.host], categories: action.game.categories, currentTurn: currentTurn, playerNum: action.game.playerNum }
            return Object.assign({}, state, obj1)
        case REMOVE_GAME:
            let obj2 = R.clone(state);
            obj2[action.game.gameId] = undefined;
            return obj2;
        case ADD_PLAYER_TO_GAME:
            let obj3 = R.clone(state);
            obj3[action.playerToGame.gameId].gamePlayers.push(action.playerToGame.player);
            return obj3;
        default:
            return state;
    }
}

module.exports = { addPlayerToGameThunk, addGameThunk, reducer };
