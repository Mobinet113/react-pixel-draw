import pixels from './modules/pixels';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  pixels: pixels
});

export default reducer;