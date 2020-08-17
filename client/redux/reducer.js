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
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunks));

export default store;