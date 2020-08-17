import { createStore, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import TYPES from './types';

const initialState = {
  initSearchResults: [],
  mainTrack: {},
  mainTrackInfo: {},
  mainKey: {}
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case TYPES.INIT_SEARCH:
      return {
        ...state,
        initSearchResults: action.results
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
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunks));

export default store;