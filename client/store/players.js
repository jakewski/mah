import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_PLAYER = 'SET_PLAYER';
const SET_ROOM = 'SET_ROOM';
const ADD_TO_PLAYERS = 'ADD_TO_PLAYERS';
const REPLACE_PLAYERS = 'REPLACE_PLAYERS';
const REMOVE_PLAYER = 'REMOVE_PLAYER';

/**
 * INITIAL STATE
 */
//player: {name: '', id: ''}
const initialState = {
  room: 'Main',
  player: {},
  players: [],
}

/**
 * ACTION CREATORS
 */
const setPlayer = player => ({type: SET_PLAYER, player});
const setRoom = room => ({type: SET_ROOM, room});
const addToPlayers = player => ({type: ADD_TO_PLAYERS, player})
const replacePlayers = players => ({type: REPLACE_PLAYERS, players})
const removePlayer = () => ({type: REMOVE_PLAYER});

/**
 *
 * THUNK CREATORS
 */
export const setPlayerThunk = player => dispatch => {
  axios.post('/api/player/set', player)
  .then(res =>  { 
    dispatch(setPlayer(res.data))
  })
}

export const removePlayerThunk = () => dispatch => {
  dispatch(removePlayer())
}

export const setRoomThunk = room => dispatch => {
  dispatch(setRoom(room))
}

export const addToPlayersThunk = player => dispatch => {
  dispatch(addToPlayers(player))
}

export const replacePlayersThunk = players => dispatch => {
  dispatch(replacePlayers(players))
}


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PLAYER:
      return Object.assign({}, state, { player: action.player, players: [action.player] });
    case SET_ROOM:
      return Object.assign({}, state, {room: action.room});
    case ADD_TO_PLAYERS:
      return Object.assign({}, state, {players: [...state.players, action.player]})
    case REPLACE_PLAYERS:
      return Object.assign({}, state, {players: action.players})
    case REMOVE_PLAYER:
      return Object.assign({}, state, {player: {}});
    default:
      return state;
  }
}
