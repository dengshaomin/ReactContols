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
import LastGameComponent from './LastGamePage.js'
import ReadyGameComponent from './ReadyGamePage'
import * as Routes from './Routes.js'
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react/native';

class NewGameComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 0
        }
        this.position = 0;
        this.currentPage = 1;
        this._dataSource = new Array();
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text
                        style={{
                            fontSize: fonts.font13, color: this.props.selectedTab == reducertypes.NEW_GAME_TABS.LAST ? colors.white : colors.green,
                            paddingTop: 5, paddingBottom: 5, paddingLeft: 25, paddingRight: 25,
                            textAlign: 'center',
                            backgroundColor: this.props.selectedTab == reducertypes.NEW_GAME_TABS.LAST ? colors.green : colors.white,
                            borderColor: colors.green, borderWidth: 1,
                        }}
                        onPress={() => this.switchTab(reducertypes.NEW_GAME_TABS.LAST)}
                        ref={(button_left) => this.button_left = button_left}
                    >
                        最新上线
                    </Text>
                    <Text
                        style={{
                            fontSize: fonts.font13, color: this.props.selectedTab == reducertypes.NEW_GAME_TABS.LAST ? colors.green : colors.white,
                            paddingTop: 5, paddingBottom: 5, paddingLeft: 25, paddingRight: 25,
                            textAlign: 'center',
                            backgroundColor: this.props.selectedTab == reducertypes.NEW_GAME_TABS.LAST ? colors.white : colors.green,
                            borderColor: colors.green, borderWidth: 1,
                        }}
                        onPress={() => this.switchTab(reducertypes.NEW_GAME_TABS.READY)}
                        ref={(button_right) => this.button_right = button_right}
                    >
                        即将开放
                    </Text>
                </View>
                <View style={styles.diverLine} />
                <ViewPagerAndroid
                    ref={viewPager => { this.viewPage = viewPager; }}
                    removeClippedSubviews={false}
                    initialPage={this.props.selectedTab == reducertypes.NEW_GAME_TABS.LAST ? 0 : 1}
                    style={{ flex: 1 }}
                    onPageSelected={this.onPageSelected.bind(this)}
                    ref={viewPager => { this.viewPage = viewPager; }}>
                    <View >
                        <LastGameComponent navigator={this.props.navigator} />
                    </View>
                    <View >
                        <ReadyGameComponent navigator={this.props.navigator} />
                    </View>
                </ViewPagerAndroid>
            </View >
        );
    }
    switchTab(selectedTab) {
        // if (this.state.pageIndex != selectedTab) {
        //     this.setState({ pageIndex: selectedTab });
        // }
        this.viewPage.setPage(selectedTab == reducertypes.NEW_GAME_TABS.LAST ? 0 : 1);
        this.position = selectedTab == reducertypes.NEW_GAME_TABS.LAST ? 0 : 1;
        this.setButtonState();
        // if (this.props.selectedTab != selectedTab) {
        //     this.props.dispatch(switchTitleBarTab(reducertypes.NEW_GAME_SWITCH_TAB, selectedTab));
        // }
    }
    setButtonState() {
        this.button_left.setNativeProps({
            style: {
                fontSize: fonts.font13, color: this.position == 0 ? colors.white : colors.green,
                paddingTop: 5, paddingBottom: 5, paddingLeft: 25, paddingRight: 25,
                textAlign: 'center',
                backgroundColor: this.position == 0 ? colors.green : colors.white,
            }
        });
        this.button_right.setNativeProps({
            style: {
                fontSize: fonts.font13, color: this.position == 0 ? colors.green : colors.white,
                paddingTop: 5, paddingBottom: 5, paddingLeft: 25, paddingRight: 25,
                textAlign: 'center',
                backgroundColor: this.position == 0 ? colors.white : colors.green,
                borderColor: colors.green, borderWidth: 1,
            }
        });
    }
    onPageSelected(e) {
        // this.setState({ pageIndex: e.nativeEvent.position });
        // this.switchTab(e.nativeEvent.position == 0 ? reducertypes.NEW_GAME_TABS.LAST : reducertypes.NEW_GAME_TABS.READY);
        this.position = e.nativeEvent.position;
        this.setButtonState();
    }
}
function select(store) {
    return {
        selectedTab: store.newGamePageStore.selectedTab,
    }
}

export default connect(select)(NewGameComponent);

