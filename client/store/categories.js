import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES';

/**
 * INITIAL STATE
 */
const initialState = {
  categories: [],
}

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({type: GET_CATEGORIES, categories});

/**
 * THUNK CREATORS
 */
export const getCategoriesThunk = () => dispatch =>
  axios.get(`/api/categories`)
    .then(res => {
      dispatch(getCategories(res.data))
      return null
    })
    .catch(err => console.log(err));


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return Object.assign({}, state, {categories: action.categories});
    default:
      return state;
  }
}
