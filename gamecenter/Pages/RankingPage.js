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
var currentPage = 1;
var _dataSource = new Array();
class RecommendComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 0
        }
    }

    componentDidMount() {
        this.setState({ pageIndex: 0 });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        style={{
                            fontSize: fonts.font13, color: this.state.pageIndex == 0 ? colors.white : colors.green,
                            paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10,
                            textAlign: 'center',
                            backgroundColor: this.state.pageIndex == 0 ? colors.green : colors.white,
                            borderColor: colors.green, borderWidth: 1,
                        }}
                        onPress={() => this.switchTab(0)}>
                        精品榜
                    </Button>
                    <Button
                        style={{
                            fontSize: fonts.font13, color: this.state.pageIndex == 1 ? colors.white : colors.green,
                            paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10,
                            textAlign: 'center',
                            backgroundColor: this.state.pageIndex == 1 ? colors.green : colors.white,
                            borderColor: colors.green, borderWidth: 1,
                        }}
                        onPress={() => this.switchTab(1)}>
                        热搜榜
                    </Button>
                    <Button
                        style={{
                            fontSize: fonts.font13, color: this.state.pageIndex == 2 ? colors.white : colors.green,
                            paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10,
                            textAlign: 'center',
                            backgroundColor: this.state.pageIndex == 2 ? colors.green : colors.white,
                            borderColor: colors.green, borderWidth: 1,
                        }}
                        onPress={() => this.switchTab(2)}>
                        飙升榜
                    </Button>
                    <Button
                        style={{
                            fontSize: fonts.font13, color: this.state.pageIndex == 3 ? colors.white : colors.green,
                            paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10,
                            textAlign: 'center',
                            backgroundColor: this.state.pageIndex == 3 ? colors.green : colors.white,
                            borderColor: colors.green, borderWidth: 1,
                        }}
                        onPress={() => this.switchTab(3)}>
                        新游榜
                    </Button>
                </View>
                <View style={styles.diverLine} />
                <ViewPagerAndroid
                    ref={viewPager => { this.viewPage = viewPager; } }
                    removeClippedSubviews={false}
                    initialPage={this.state.pageIndex}
                    style={{ flex: 1 }}
                    onPageSelected={this.onPageSelected.bind(this)}
                    ref={viewPager => { this.viewPage = viewPager; } }>
                    <View >
                        <RankingChildPage rankingType={types.RankingType.CHOICE}/>
                    </View>
                    <View>
                        <RankingChildPage rankingType={types.RankingType.HOT}/>
                    </View>
                    <View >
                        <RankingChildPage rankingType={types.RankingType.UP}/>
                    </View>
                    <View>
                        <RankingChildPage rankingType={types.RankingType.NEW}/>
                    </View>
                </ViewPagerAndroid>
            </View>
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
function select(store) {
    return {
        selectedTab: store.newGamePageStore.selectedTab,
    }
}

export default connect(select)(RecommendComponent);

