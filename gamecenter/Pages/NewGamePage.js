import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ListView,
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
var currentPage = 1;
var _dataSource = new Array();
class RecommendComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            loadingStatu: types.ListViewStatus.LOADING,
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        style={{
                            fontSize: fonts.font13, color: this.props.selectedTab == reducertypes.NEW_GAME_TABS.LAST ? colors.white : colors.green,
                            paddingTop: 5, paddingBottom: 5, paddingLeft: 25, paddingRight: 25,
                            textAlign: 'center',
                            backgroundColor: this.props.selectedTab == reducertypes.NEW_GAME_TABS.LAST ? colors.green : colors.white,
                            borderColor: colors.green, borderWidth: 1,
                        }}
                        onPress={() => this.switchTab(reducertypes.NEW_GAME_TABS.LAST)}>
                        最新上线
                    </Button>
                    <Button
                        style={{
                            fontSize: fonts.font13, color: this.props.selectedTab == reducertypes.NEW_GAME_TABS.LAST ? colors.green : colors.white,
                            paddingTop: 5, paddingBottom: 5, paddingLeft: 25, paddingRight: 25,
                            textAlign: 'center',
                            backgroundColor: this.props.selectedTab == reducertypes.NEW_GAME_TABS.LAST ? colors.white : colors.green,
                            borderColor: colors.green, borderWidth: 1,
                        }}
                        onPress={() => this.switchTab(reducertypes.NEW_GAME_TABS.READY)}>
                        即将开放
                    </Button>
                </View>
                <RefreshListViewComponent dataSource={this.state.dataSource} loadingStatu={this.state.loadingStatu} renderRow={this._renderItem.bind(this)}
                    onRefresh={this._onRefresh.bind(this)} />
            </View>
        );
    }

    _onRefresh(pageIndex) {
        currentPage = pageIndex;
        var th = this;
        const getPromise = GameService.getPromise('http://gank.io/api/search/query/listview/category/%E7%A6%8F%E5%88%A9/count/30/page/1', null);
        getPromise.then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                this._callback(types.NetStatu.ERROR);
            }
        }).then((json) => {
            this._callback(types.NetStatu.SUCCESS, json);
        }).catch(function (error) {
            console.log(error);
            this._callback(types.NetStatu.ERROR);
        });

    }
    _callback(type, json) {
        if (type == types.NetStatu.SUCCESS) {
            this._setData(type, json)
            _dataSource.push(...json.results);
            this.setState({ dataSource: this.state.dataSource.cloneWithRows(_dataSource), loadingStatu: types.ListViewStatus.FINISH });
        } else if (type == types.NetStatu.ERROR) {
            this.setState({ loadingStatu: types.ListViewStatus.ERROR });
        }
    }
    _setData(type, data) {
        console.log(3333);
        // _dataSource.push(...json.results);
        // this.setState({ dataSource: this.state.dataSource.cloneWithRows(this._dataSource), loadingStatu: types.ListViewStatus.FINISH });
    }
    _renderItem(data) {
        return (<LongGameItem source={{ uri: 'http://facebook.github.io/react/img/logo_og.png' }} />);
    }
    switchTab(selectedTab) {
        if (this.props.selectedTab !== selectedTab) {
            this.props.dispatch(switchTitleBarTab(reducertypes.NEW_GAME_SWITCH_TAB, selectedTab));
        }
    }

}
function select(store) {
    return {
        selectedTab: store.newGamePageStore.selectedTab,
    }
}

export default connect(select)(RecommendComponent);

