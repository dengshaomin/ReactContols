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
import * as Screen from '../tools/Screen.js'
import CategoryItem from '../widgets/CategoryItem.js'
import * as Routes from './Routes.js'
var currentPage = 1;
export default class CategoryComponent extends Component {
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
            <RefreshListViewComponent dataSource={this.state.dataSource} loadingStatu={this.state.loadingStatu} renderRow={this._renderItem.bind(this)}
                onRefresh={this._onRefresh.bind(this)} isLoadMore={false} contentContainerStyle={thisstyles.listStyle} />
        );
    }
    _onRefresh(pageIndex) {
        currentPage = pageIndex;
        this._request();
    }
    _request() {
        const getPromise = GameService.getPromise('http://gamecenter.iqiyi.com/gamecenter/cate', null);
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
            this.setState({ dataSource: this.state.dataSource.cloneWithRows(json.categories), loadingStatu: types.ListViewStatus.FINISH });
        } else if (type == types.NetStatu.ERROR) {
            this.setState({ loadingStatu: types.ListViewStatus.ERROR });
        }
    }
    _renderItem(data, rowId) {
        return (<CategoryItem data={data} index={rowId} onPress={this.onPress.bind(this)} />);
    }

    onPress(data, index) {
        this.props.navigator.push({ id: 'test', index: index });
    }
}

const thisstyles = StyleSheet.create({
    listStyle: {
        flexDirection: 'row', //改变ListView的主轴方向
        flexWrap: 'wrap', //换行
        justifyContent: 'flex-start',
    }
});


