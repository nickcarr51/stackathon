import { createStore, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import TYPES from './types';

const initialState = {
  initSearchResults: [],
  initSearchInfo: [],
  mainTrack: {},
  mainTrackInfo: {},
  mainKey: {},
  harmonicKeys: [],
  allSimilar: [],
  allSimilarInfo: [],
  currPlaylist: [],
  camelot: false,
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case TYPES.INIT_SEARCH:
      return {
        ...state,
        initSearchResults: action.results
      }
    case TYPES.INIT_SEARCH_INFO:
      return {
        ...state,
        initSearchInfo: action.similar
      }
    case TYPES.CLEAR_SEARCH:
      return {
        ...state,
        initSearchResults: [],
        initSearchInfo: [],
      }
    case TYPES.GET_MAIN_TRACK:
      return {
        ...state,
        mainTrack: action.mainTrack
      }
    case TYPES.GET_MAIN_INFO:
      return {
        ...state,
        mainTrackInfo: action.trackInfo
      }
    case TYPES.GET_MAIN_KEY:
      return {
        ...state,
        mainKey: action.mainKey
      }
    case TYPES.GET_HARMONIC_KEYS:
      return {
        ...state,
        harmonicKeys: action.harmonicKeys
      }
    case TYPES.GET_ALL_SIMILAR:
      return {
        ...state,
        allSimilar: action.similar
      }
    case TYPES.ALL_SIMILAR_INFO:
      return {
        ...state,
        allSimilarInfo: action.similar
      }
    case TYPES.ADD_TO_PLAYLIST:
      return {
        ...state,
        currPlaylist: [...state.currPlaylist, action.track],
      }
    case TYPES.GET_PLAYLIST:
      return {
        ...state,
        currPlaylist: action.playlist
      }
    case TYPES.DELETE_FROM_PLAYLIST:
      return {
        ...state,
        currPlaylist: state.currPlaylist.filter(track => track.songId !== action.deletedTrack)
      }
    case TYPES.CLEAR_PLAYLIST:
      return {
        ...state,
        currPlaylist: []
      }
    case TYPES.TOGGLE_CAMELOT:
      return {
        ...state,
        camelot: !state.camelot
      }
    case TYPES.GO_BACK:
      return {
        ...state,
        mainTrack: {},
        mainTrackInfo: {},
        mainKey: {},
        harmonicKeys: [],
        allSimilar: [],
        allSimilarInfo: [],
      }
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunks));

export default store;