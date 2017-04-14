import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewPagerAndroid,
} from 'react-native';
import colors from '../values/colors';
import fonts from '../values/fonts';
import styles from '../values/styles'
import AndroidImage from '../widgets/AndroidImage'
import * as GlobalConst from '../GlobalConst'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import NewGamePage from './NewGamePage'
export default class RecommendComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <Text style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center' }}>太复杂，先不做</Text>
        );
    }

}
