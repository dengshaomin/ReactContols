import * as TYPES from './types';

export function switchTitleBarTab(type, selectedTab) {
  RLOG('actions -> titleBarTab -> switchTitleBarTab ' + selectedTab);
  return {
    type: type,
    selectedTab: selectedTab,

  }

}