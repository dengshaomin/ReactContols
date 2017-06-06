import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewPagerAndroid,
    ToolbarAndroid,
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
import AppToolBar from '../widgets/AppToolBar.js'
import * as Routes from './Routes.js'
export default class RecommendComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { isLocked: false }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <AppToolBar titleCenter='游戏中心' navigator={this.props.navigator} />
                <ScrollableTabView renderTabBar={() => <DefaultTabBar />} tabBarActiveTextColor={colors.green} tabBarInactiveTextColor={colors.font1}
                    tabBarUnderlineStyle={{ backgroundColor: colors.green, height: 1 }}
                    scrollWithoutAnimation={false}
                    locked={false}
                    tabBarTextStyle={{ fontSize: fonts.font14, paddingTop: 20 }}
                    style={{ marginTop: -10 }}
                    >
                    <ChoicePage tabLabel='精选' hasTouch={this._hasTouch.bind(this)} navigator={this.props.navigator} />
                    <NewGamePage tabLabel='新游' navigator={this.props.navigator} />
                    <CategoryPage tabLabel='分类' navigator={this.props.navigator} />
                    <RankingPage tabLabel='排行' navigator={this.props.navigator} />
                </ScrollableTabView>
            </View >
        );
    }
    _hasTouch = (isTouch) => {
        console.log(isTouch)
        this.setState({isLocked: isTouch})
    }
}
