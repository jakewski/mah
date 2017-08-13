import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_PLAYER = 'SET_PLAYER';
const REMOVE_PLAYER = 'REMOVE_PLAYER';

/**
 * INITIAL STATE
 */
const initialState = {
  player: {},
  players: [],
}

/**
 * ACTION CREATORS
 */
const setPlayer = player => ({type: SET_PLAYER, player});
const removePlayer = () => ({type: REMOVE_PLAYER});

/**
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


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PLAYER:
      return Object.assign({}, state, {player: action.player});
    case REMOVE_PLAYER:
      return Object.assign({}, state, {player: {}});
    default:
      return state;
  }
}
