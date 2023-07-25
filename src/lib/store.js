import { configureStore } from '@reduxjs/toolkit';

const initialState = { games: {loaded: false}, gamePage: {selectedPlayer: null} };

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'setGames':
        return { ...state, games: action.payload };
    case 'setSelectedPlayer':
        return { ...state, gamePage: {selectedPlayer: action.payload} };
    default:
      return state;
  }
}

export const store = configureStore({
    reducer: reducer,
})