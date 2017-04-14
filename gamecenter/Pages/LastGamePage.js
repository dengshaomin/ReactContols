import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ListView,
    InteractionManager,
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
import * as Routes from './Routes.js'
var currentPage = 1;
var _dataSource = new Array();
export default class LastGameComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
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
                <RefreshListViewComponent dataSource={this.state.dataSource} loadingStatu={this.state.loadingStatu} renderRow={this._renderItem.bind(this)}
                    onRefresh={this._onRefresh.bind(this)} renderHeader={this._renderHeader.bind(this)} onLoadMore={this._onLoadMore.bind(this)} />
            </View>
        );
    }
    _renderHeader() {
        return (<View>
            <Text style={[styles.font1_14, { padding: 10 }]}>{this.state.title}</Text>
            <View style={styles.diverLine} />
        </View>);
    }
    _onLoadMore(pageIndex) {
        currentPage = pageIndex;
        this._request();
    }
    _onRefresh(pageIndex) {
        currentPage = pageIndex;
        this._request();
    }
    _request() {
        const getPromise = GameService.getPromise('http://gamecenter.iqiyi.com/gamecenter/newapps',
            { page: currentPage, size: GlobalConst.PAGE_SIZE, user_id: '' });
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
            if (currentPage == 1) _dataSource = [];
            _dataSource.push(...json.list);
            this.setState({ title: json.title, dataSource: this.state.dataSource.cloneWithRows(_dataSource), loadingStatu: types.ListViewStatus.FINISH });
        } else if (type == types.NetStatu.ERROR) {
            this.setState({ loadingStatu: types.ListViewStatus.ERROR });
        }
    }
    _renderItem(data) {
        return (<LongGameItem data={data} onPress={this.onPress.bind(this)} navigator={this.props.navigator} />);
    }
    onPress(data, index) {

    }

}



