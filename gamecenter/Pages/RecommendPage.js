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
import CategoryPage from './CategoryPage.js'
import ChoicePage from './ChoicePage.js'
import RankingPage from './RankingPage.js'
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
                style={{ marginTop: -10 }}
                >
                <ChoicePage tabLabel='精选' />
                <NewGamePage tabLabel='新游' />
                <CategoryPage tabLabel='分类' />
                <RankingPage tabLabel='排行' />
            </ScrollableTabView>
        );
    }

}
