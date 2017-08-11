import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_MEMESTREAM = 'GET_MEMESTREAM';

/**
 * INITIAL STATE
 */
const initialState = [];

/**
 * ACTION CREATORS
 */
const getMemeStream = memes => ({type: GET_MEMESTREAM, memes});

/**
 * THUNK CREATORS
 */
export const getMemeStreamThunk = () => dispatch =>
  axios.get(`/api/winningAnswers`)
    .then(res => {

      let memeObj = {};
      let response = [];

      for(var i = 0; i < res.data.length; ++i) {
        let fullText = '';
        if(res.data[i].text.indexOf(',') === -1 ) {
          fullText = res.data[i].meme.text + ", " + res.data[i].text;
        } else {
          fullText = res.data[i].meme.text + " " + res.data[i].text;
        }

        let memeObj = {
          text: fullText,
          imageUrl: res.data[i].meme.image
        }
        response[i] = memeObj;
      }//for
      dispatch(getMemeStream(response));
    })
    .catch(err => console.log(err));


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MEMESTREAM:
      return action.memes;
    default:
      return state;
  }
}
