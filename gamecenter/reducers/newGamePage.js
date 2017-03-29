import * as TYPES from '../actions/types';

const initialState = {
  selectedTab: TYPES.NEW_GAME_TABS.LAST,
};


export default function mainPage(state = initialState, action) {
  switch (action.type) {
    case TYPES.NEW_GAME_SWITCH_TAB:
      return {
        ...state,
        selectedTab: action.selectedTab,
      };
    default:
      return state;
  }
}