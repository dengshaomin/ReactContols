import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ListView,
    ViewPagerAndroid,
} from 'react-native';
import colors from '../values/colors';
import fonts from '../values/fonts';
import styles from '../values/styles'
import * as types from '../values/types'
import * as reducertypes from '../actions/types.js'
import RefreshListViewComponent from '../widgets/RefreshListView'
import { switchTitleBarTab } from '../actions/changeTab'
import Button from 'react-native-button'
import { connect } from 'react-redux'
import GameService from '../network/GameService.js'
import * as GlobalConst from '../GlobalConst.js'
import LongGameItem from '../widgets/LongGameItem.js'
import RankingChildPage from './RankingChildPage..js'
import ButtonTabBar from '../widgets/ButtonTabBar.js'
import ScrollableTabView from 'react-native-scrollable-tab-view'
export default class RankingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 0
        }
        this.tabNames = ['精品榜', '热搜榜', '飙升榜', '新游榜'];
    }

    componentDidMount() {
        this.setState({ pageIndex: 0 });

    }

    render() {
        return (
            <ScrollableTabView
                renderTabBar={() => <ButtonTabBar tabNames={this.tabNames}
                />}
            >
                <RankingChildPage rankingType={types.RankingType.CHOICE} />
                <RankingChildPage rankingType={types.RankingType.HOT} />
                <RankingChildPage rankingType={types.RankingType.UP} />
                <RankingChildPage rankingType={types.RankingType.NEW} />
            </ScrollableTabView>
        );
    }
    switchTab(selectedTab) {
        this.viewPage.setPage(selectedTab);
        if (this.state.pageIndex != selectedTab) {
            this.setState({ pageIndex: selectedTab });
        }

        // if (this.props.selectedTab !== selectedTab) {
        //     this.props.dispatch(switchTitleBarTab(reducertypes.NEW_GAME_SWITCH_TAB, selectedTab));
        // }
    }
    onPageSelected(e) {
        this.setState({ pageIndex: e.nativeEvent.position });
    }
}



