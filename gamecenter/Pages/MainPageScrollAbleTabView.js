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
import TabItem from '../widgets/TabItem.js'
import LastGamePage from './LastGamePage.js'
import ReadyGamePage from './ReadyGamePage.js'
import RecommendPage from './RecommendPage.js'
import MinePage from './MinePage.js'
import WeixinTabBar from '../widgets/WeixinTabBar.js'
export default class RecommendComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.tabNames = ['推荐', '福利', '我的'];
        this.tabIconNames = ['icon_recommend_p', 'icon_gift_p', 'icon_mine_p'];
        this.unTabIconNames = ['icon_recommend', 'icon_gift', 'icon_mine'];
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollableTabView
                    renderTabBar={() => <WeixinTabBar tabNames={this.tabNames} tabIconNames={this.tabIconNames} unTabIconNames={this.unTabIconNames} />}

                    tabBarPosition={'bottom'}
                >
                    <RecommendPage navigator={this.props.navigator}/>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20 }}>我是第2个选项卡，直接书写出的视图!</Text>
                    </View>
                    <MinePage navigator={this.props.navigator}/>
                </ScrollableTabView>
            </View >
        );
    }

}