import TYPES from './types';
const axios = require('axios');

export const initSearch = (input) => (dispatch) => {
  axios.post('/api/initsearch', { input })
    .then(res => {
      dispatch({
        type: TYPES.INIT_SEARCH,
        results: res.data,
      })
    })
}

export const clearSearch = () => (dispatch) => {
  dispatch({
    type: TYPES.CLEAR_SEARCH,
  })
}