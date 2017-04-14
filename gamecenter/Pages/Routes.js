import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewPagerAndroid,
    ToolbarAndroid,
    Navigator,
    BackAndroid
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
import { showToast } from '../tools/toast';
import MainPage from './MainPage.js'
import RecommendPage from './RecommendPage.js'
import MinePage from './MinePage.js'
import TestPage from './TestPage.js'
import LastGamePage from './LastGamePage.js'
import GameDetailPage from './GameDetailPage.js'
export function navigator(page) {
    return (<Navigator
        initialRoute={{ id: page }}
        renderScene={this.renderScene}
        configureScene={(route) => {
            if (route.sceneConfig) {
                return route.sceneConfig;
            }
            return Navigator.SceneConfigs.PushFromRight;
        }} />);
}
export function renderScene(route, navigator) {
    BackAndroid.addEventListener('hardwareBackPress', () => {
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }
        let curTimestamp = new Date().getTime();

        // 判断3秒内两次按返回键才真正退出APP
        if (this.extTimestamp !== undefined && curTimestamp - this.extTimestamp <= 3000) {
            // 真正退出
            return false;
        } else {
            showToast('再按一次退出APP');
            this.extTimestamp = curTimestamp;
            return true;
        }
    });
    switch (route.id) {
        case 'main':
            return <MainPage navigator={navigator} />;
        case 'recommend':
            return <RecommendPage navigator={navigator} />;
        case 'mine':
            return <MinePage navigator={navigator} />;

        case 'choice':
            return <ChoicePage navigator={navigator} tabLabel='精选' />;
        case 'newgame':
            return <NewGamePage navigator={navigator} tabLabel='新游' />;
        case 'category':
            return <CategoryPage navigator={navigator} tabLabel='分类' />;
        case 'rank':
            return <RankingPage navigator={navigator} />;
        case 'lastgame':
            return <LastGamePage navigator={navigator} />;
        case 'gamedetail':
            return <GameDetailPage data={route.data} navigator={navigator} />;
        case 'test':
            return <TestPage index={route.index} navigator={navigator} />;

    }
}


