import { AlertIOS, ToastAndroid, Platform, StatusBar } from 'react-native';
var Dimensions = require('Dimensions');
var { width } = Dimensions.get('window');
var { height } = Dimensions.get('window');
export function getScreenWidth() {
  return width;
}
export function getScreenHeight() {
  return height;
}
export function getStatuBarHeight() {
  return StatusBar.currentHeight;
}