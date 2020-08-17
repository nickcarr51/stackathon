import TYPES from './types';
import { getKey } from 'camelot-wheel';

const axios = require('axios');

export const initSearch = (input) => (dispatch) => {
  axios.post('/api/initsearch', { input })
    .then(res => {
      // let results = res.data;
      dispatch({
        type: TYPES.INIT_SEARCH,
        results: res.data,
      })
    })
}
export const getTrack = (id) => (dispatch) => {
  axios.post('/api/gettrack', { id })
    .then(res => {
      dispatch({
        type: TYPES.GET_MAIN_TRACK,
        mainTrack: res.data
      })
    })
}
export const getInfo = (id) => (dispatch) => {
  axios.post('/api/getinfo', { id })
    .then(res => {
      dispatch({
        type: TYPES.GET_MAIN_INFO,
        trackInfo: res.data
      })
      dispatch({
        type: TYPES.GET_MAIN_KEY,
        mainKey: getKey({ pitchClass: res.data.key, mode: res.data.mode })
      })
    })
}

export const clearSearch = () => (dispatch) => {
  dispatch({
    type: TYPES.CLEAR_SEARCH,
  })
}