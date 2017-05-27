/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  ToastAndroid,
} from 'react-native';

import GiftedListView from 'react-native-gifted-listview';
import GiftedSpinner from 'react-native-gifted-spinner';
import CounterItem from '../widgets/CounterItem.js'
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import Counter1 from '../mobx/2-counter/Counter1.js'
import Counter2 from '../mobx/2-counter/Counter2.js'
import Counter3 from '../mobx/2-counter/Counter3.js'
import Index from '../mobx/6-list-and-global-computed/selected.js'
import NativeComponent from '../../native_component/WebViewComponent.js'
import SwipeMenuListView from '../../native_component/SwipeMenuListViewComponent.js';
import NativeViewComponent from '../../native_component/WebViewComponent.js';
import NativeButton from '../../native_component/NativeButtonComponent.js';
import TimerComponent from '../../widgets/Timer.js'
import AsycnComponent from '../../widgets/async&await&promise.js'
import PromiseComponent from '../../widgets/promise.js'
import SelectedComponent from '../mobx/6-list-and-global-computed/selected.js'
import AnimateComponent from '../../animates/AnimateComponent.js'
// import RefreshComponent  from '../../native_component/NativeUltraPullRefreshComponent.js';
import RefreshComponent  from './RefreshPage.js';
const f = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1);
      resolve(2);
    }, 2000);
  });
};

const testAsync = async () => {
  const t = await f();
  console.log(t);
};
export default class TestPage extends React.Component {

  render() {
    // this.printHello(false)
    //   .then(function (message) {
    //     console.log(message);
    //   })
    //   .then(this.printWorld)
    //   .then(this.printExclamation)
    //   .catch(function (error) {
    //     console.log(error);
    //   });;
    return (
      <View style={{ flex: 1 }}>
        <RefreshComponent />
      </View>
    );
  }
  async getData() {
    const f = await this.getdatafromnet();
    console.log(2);
  }
  getdatafromnet() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        console.log(1);
        resolve("Hello");
      }, 3000);
    });
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  printHello(ready) {
    var promise = new Promise(function (resolve, reject) {
      if (ready) {
        resolve("Hello");
      } else {
        reject("Good bye");
      }
    });
    return promise;
  }

  printWorld() {
    console.log('World');
  }

  printExclamation() {
    console.log('!!!');
  }
};

