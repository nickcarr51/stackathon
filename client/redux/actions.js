import TYPES from './types';
import { getKey, getHarmonicKeys } from 'camelot-wheel';
import { toast } from 'react-toastify';

const axios = require('axios');

export const initSearch = (input) => (dispatch) => {
  dispatch({
    type: TYPES.CLEAR_SEARCH,
  })
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

export const getSimilar = (id) => (dispatch) => {
  axios.post('/api/getsimilar', { id })
    .then(res => {
      dispatch({
        type: TYPES.GET_ALL_SIMILAR,
        similar: res.data
      })
      const ids = res.data.map(track => track.id).join(',');
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
      toast.success(`"${track.name}" added to playlist!`)
    })
}

export const getPlaylist = () => (dispatch) => {
  axios.get('/api/getplaylist')
    .then(res => {
      dispatch({
        type: TYPES.GET_PLAYLIST,
        playlist: res.data
      })
    })
}

export const deleteFromPlaylist = (id, name) => (dispatch) => {
  axios.delete(`/api/deletefromplaylist/${id}`)
    .then(res => {
      dispatch({
        type: TYPES.DELETE_FROM_PLAYLIST,
        deletedTrack: res.data
      })
      toast.error(`"${name}" removed from playlist! `)
    })
}

export const clearPlaylist = () => (dispatch) => {
  axios.delete(`/api/clearplaylist`)
    .then(res => {
      dispatch({
        type: TYPES.CLEAR_PLAYLIST,
      })
      toast.error('Playlist cleared!');
    })
}

export const login = () => (dispatch) => {
  axios.get('/api/login')
    .then(res => {
      console.log(res);
    })
}

export const toggleCamelot = () => (dispatch) => {
  dispatch({
    type: TYPES.TOGGLE_CAMELOT,
  })
}

export const goBack = (history) => (dispatch) => {
  dispatch({
    type: TYPES.GO_BACK,
  })
  history.push('/');
}

export const sendHome = () => (dispatch) => {
  axios.post('/api/sendhome');
}