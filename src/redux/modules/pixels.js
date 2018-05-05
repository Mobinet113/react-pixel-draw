import { pixelState } from '../initialState';
import update from 'react-addons-update';

// Initial State

const initialState = {
  pixels: pixelState()
};

// Actions

const LOAD_INITIAL_PIXELS = 'LOAD_INITIAL_PIXELS';
const UPDATE_PIXEL = 'UPDATE_PIXEL';

// Reducer

export default function reducer(state = initialState.pixels, action) {
  switch (action.type) {
    case UPDATE_PIXEL:
      return update(state, {
        [action.pixels.id]: {
          colour: {$set: action.pixels.colour}
        }
      });
    case LOAD_INITIAL_PIXELS:
      return action.pixels;

    default:
      return state;
  }
}

// Action Creators

export function loadInitialPixelsSuccess(pixels) {
  return { type: LOAD_INITIAL_PIXELS, pixels };
}

export function updatePixelSuccess(pixels) {
  return { type: UPDATE_PIXEL, pixels };
}

// Thunks

export function loadInitialPixels(socket){
  return function (dispatch) {
    socket.emit('loadInitialPixels');

    socket.on('loadInitialPixels', (results) => {
      console.log(results);
      dispatch(loadInitialPixelsSuccess(results));
    });

  };
}

export function updatePixel(socket, id, colour) {
  return function (dispatch) {
    dispatch(updatePixelSuccess({id: id, colour: colour}));

    if ( socket ) {
      socket.emit('updatePixel', {id: id, colour: colour})
    }
  };
}