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
  Platform
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
export default class TestPage extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Index />
      </View>
    );
  }
};

