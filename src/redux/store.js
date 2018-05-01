import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'

const enhancers = [];
const middleware = [
  thunk
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

const store = createStore(
  rootReducer,
  persistedState, //initialState
  composedEnhancers
);

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});

export default store