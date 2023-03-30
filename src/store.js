import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk'

const foo = (state = 'bar', action)=> {
  return state;
};

export const updateFoo = ()=> {
  return (dispatch)=> {
    console.log('testing out thunk');
  };
};

const reducer = combineReducers({
  foo
});

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;
