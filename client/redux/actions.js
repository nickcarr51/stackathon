import TYPES from './types';
import { getKey, getHarmonicKeys } from 'camelot-wheel';

const axios = require('axios');

export const initSearch = (input) => (dispatch) => {
  axios.post('/api/initsearch', { input })
    .then(res => {
      dispatch({
        type: TYPES.INIT_SEARCH,
        results: res.data,
      })
      const ids = res.data.map(track => track.id).join(',');
      axios.post('/api/initsearchinfo', { ids })
      .then(res => {
        dispatch({
          type: TYPES.INIT_SEARCH_INFO,
          similar: res.data
        })
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
export const getInfo = (id, harmonicKeys) => (dispatch) => {
  axios.post('/api/getinfo', { id, harmonicKeys })
    .then(res => {
      dispatch({
        type: TYPES.GET_MAIN_INFO,
        trackInfo: res.data
      })
      dispatch({
        type: TYPES.GET_MAIN_KEY,
        mainKey: getKey({ pitchClass: res.data.key, mode: res.data.mode })
      })
      dispatch({
        type: TYPES.GET_HARMONIC_KEYS,
        harmonicKeys: getHarmonicKeys({ pitchClass: res.data.key, mode: res.data.mode })
      })
    })
}

// export const getInfoUtil = async (id) => {
//   const info = await axios.post('/api/checkkey', { id }).then(res => res.data)
//   return info;
// }

export const getSimilar = (id) => (dispatch) => {
  axios.post('/api/getsimilar', { id })
    .then(res => {
      dispatch({
        type: TYPES.GET_ALL_SIMILAR,
        similar: res.data
      })
      console.log('LOOKING FOR THIS', res.data);
      const ids = res.data.map(track => track.id).join(',');
      console.log(ids);
      axios.post('/api/getsimilarinfo', { ids })
        .then(res => {
          dispatch({
            type: TYPES.ALL_SIMILAR_INFO,
            similar: res.data
          })
        })
    })
}

export const clearSearch = () => (dispatch) => {
  dispatch({
    type: TYPES.CLEAR_SEARCH,
  })
}

export const addToPlaylist = (track, trackInfo, currKey) => (dispatch) => {
  axios.post('/api/addtoplaylist', { track, trackInfo, currKey })
    .then(res => {
      dispatch({
        type: TYPES.ADD_TO_PLAYLIST,
        track: res.data,
      })
    })
}

export const getPlaylist = () => (dispatch) => {
  console.log('ACTION CALLED');
  axios.get('/api/getplaylist')
    .then(res => {
      dispatch({
        type: TYPES.GET_PLAYLIST,
        playlist: res.data
      })
    })
}