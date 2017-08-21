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
  room: 'main',
  player: {},
  players: [],
  host: {},
}

/**
 * ACTION CREATORS
 */
export const setPlayer = player => ({type: SET_PLAYER, player});
export const setRoom = room => ({type: SET_ROOM, room});
export const addToPlayers = player => ({type: ADD_TO_PLAYERS, player})
export const replacePlayers = players => ({type: REPLACE_PLAYERS, players})
export const removePlayer = () => ({type: REMOVE_PLAYER});

/**
 *
 * THUNK CREATORS
 */
// export const setPlayerThunk = player => dispatch => {
//   axios.post('/api/player/', player)
//   .then(res =>  {
//     return dispatch(setPlayer(res.data))
//   })
//   .catch(err => console.log(err))
// }



/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PLAYER:
      return Object.assign({}, state, { player: action.player, players: [action.player] });
    case SET_ROOM:
      return Object.assign({}, state, {room: action.room.id, host: action.room.host || state.host });
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
