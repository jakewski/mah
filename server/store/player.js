const ADD_PLAYER = 'ADD_PLAYER'
const REMOVE_PLAYER = 'REMOVE_PLAYER'

//on the backend we store all of our players, on the front end we will store the current player
const initialState = {}

const addPlayer = playerInfo => ({ type: ADD_PLAYER, playerInfo });
const removePlayer = playerId => ({ type: REMOVE_PLAYER, playerId });

const addPlayerThunk = playerInfo => dispatch => {
  dispatch(addPlayer(playerInfo));
}

const reducer = function (state = initialState, action){
    switch (action.type){
        case ADD_PLAYER:
            let obj1 = Object.assign({}, state);
            obj1[action.playerInfo.id] = { score: 0, name: action.playerInfo.name, sessionId: action.playerInfo.sessionId }
            return Object.assign({}, state, obj1)
        case REMOVE_PLAYER:
            let obj2 = Object.assign({}, state);
            obj2[action.playerId] = undefined;
            return Object.assign({}, state, obj2);
        default:
            return state;
    }
}

module.exports = { addPlayerThunk, reducer };
