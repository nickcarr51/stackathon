import { createStore, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import TYPES from './types';

const initialState = {
  initSearchResults: [],
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
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunks));

export default store;