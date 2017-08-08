import socket from '../socket'

const ADD_PLAYER = 'ADD_PLAYER'
const REMOVE_PLAYER = 'REMOVE_PLAYER'

const initialState = {
    players: [],
}

const addPlayer = playerId => ({ type: ADD_PLAYER, playerId });
const removePlayer = playerId => ({ type: REMOVE_PLAYER, playerId });


export const addPlayerThunk = playerId => dispatch => {
    dispatch(addPlayer(playerId));
}

export default function (state = initialState, action){
    switch (action.type){
        case ADD_PLAYER:
            return Object.assign({}, state, { players: [...state.players, action.playerId] })
        case REMOVE_PLAYER:
            return Object.assign({}, state, { players: [...state.players.filter(player => player !== action.playerId)] })
        default:
            return state;
    }
}