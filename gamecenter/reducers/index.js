import { combineReducers } from 'redux';
// import navigatorReducer from './navigator';
import mainPageReducer from './mainPage';
import newGameReducer from './newGamePage'
export default combineReducers({
  // navigatorStore: navigatorReducer,
  mainPageStore: mainPageReducer,
  newGamePageStore:newGameReducer,
});
