import { getFromStorage } from '../utils/LocalStorageHelper';

const initialState = {
  tutorialOpen: true
};

export default function tutorialReducer (state = initialState, { type, payload }) {
  return state;
}
