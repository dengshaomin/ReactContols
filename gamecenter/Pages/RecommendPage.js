import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
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
            <ScrollableTabView renderTabBar={() => <DefaultTabBar />} tabBarActiveTextColor={colors.green} tabBarInactiveTextColor={colors.font1}
                tabBarUnderlineStyle={{ backgroundColor: colors.green, height: 1 }}
                tabBarTextStyle={{ fontSize: fonts.font14, paddingTop: 20 }}
                style={{ height: 100, marginTop: -10 }}
                >
                <NewGamePage tabLabel='精选' />
                <Text style={{ flex: 1, backgroundColor: 'red' }} tabLabel='新游' />
                <Text tabLabel='分类' />
                <Text tabLabel='排行' />
            </ScrollableTabView>
        );
    }

}
