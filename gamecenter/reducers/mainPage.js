import * as TYPES from '../actions/types';

const initialState = {
  selectedTab: TYPES.HOME_TABS.RECOMMEND,
};


export default function mainPage(state=initialState, action) {
  switch (action.type) {
    case TYPES.HOME_SWITCH_TAB:
      return {
        ...state,
        selectedTab: action.selectedTab,
      };
    default:
      return state;
  }
}