import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_PLAYER = 'SET_PLAYER';

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

/**
 * THUNK CREATORS
 */
export const setPlayerThunk = player => dispatch => {
  axios.post('/api/player/set', player)
  .then(res =>  { 
    dispatch(setPlayer(res.data))
  })
}


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PLAYER:
      return Object.assign({}, state, {player: action.player});
    default:
      return state;
  }
}
