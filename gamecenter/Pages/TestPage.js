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
export default class TestPage extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SwipeMenuListView style={{ flex: 1 }} array={["Java", "C", "C++", "C#", "Python", "PHP"
          , "Visual Basic .NET", "JavaScript", "Assembly Language", "Ruby", "Perl"
          , "Delphi", "Visual Basic", "Swift", "MATLAB", "Pascal"]}
          onDelete={(event) => {
            ToastAndroid.show(event.nativeEvent.language, ToastAndroid.SHORT);
          }
          } />
        <NativeViewComponent style={{ flex: 1 }} />
        <NativeComponent style={{ flex: 1 }} />
        <NativeButton style={{ flex: 1 }} onClick={(event) => { console.log(JSON.parse(event.nativeEvent.nativebuttonclick))}} />
      </View>
    );
  }
};

