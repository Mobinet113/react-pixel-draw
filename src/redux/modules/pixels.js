import { pixelState } from '../initialState';
import update from 'react-addons-update';

// Initial State

const initialState = {
  pixels: pixelState()
};

// Actions

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

    default:
      return state;
  }
}

// Action Creators


export function updatePixelSuccess(pixels) {
  return { type: UPDATE_PIXEL, pixels };
}

// Thunks

export function updatePixel(id, colour) {
  return function (dispatch) {
    console.log("Updating Pixel: ", id + " to " + colour);
    dispatch(updatePixelSuccess({id: id, colour: colour}));

  };
}
