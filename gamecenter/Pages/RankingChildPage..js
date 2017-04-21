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
import RankingChildItem from '../widgets/RankingChildItem.js'
import ProgressButton from '../widgets/ProgressButton.js'
import AndroidImage from '../widgets/AndroidImage.js'
export default class RankingChildComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            loadingStatu: types.ListViewStatus.LOADING,
        }
        this.currentPage = 1;
        this._dataSource = new Array();
        this.type = this.props.rankingType == null ? types.RankingType.CHOICE : this.props.rankingType;
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <RefreshListViewComponent dataSource={this.state.dataSource} loadingStatu={this.state.loadingStatu} renderRow={this._renderItem.bind(this)}
                    onRefresh={this._onRefresh.bind(this)} onLoadMore={this._onLoadMore.bind(this)} />
            </View>
        );
    }
    _onLoadMore(pageIndex) {
        this.currentPage = pageIndex;
        this._request();
    }
    _onRefresh(pageIndex) {
        this.currentPage = pageIndex;
        this._request();
    }
    async _request() {
        const getPromise = GameService.getPromise('http://gamecenter.iqiyi.com/gamecenter/top/rankNew',
            { no: this.currentPage, size: GlobalConst.PAGE_SIZE, type: this.type });
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
            if (this.currentPage == 1) this._dataSource = [];
            this._dataSource.push(...json.apps);
            this.setState({ title: json.title, dataSource: this.state.dataSource.cloneWithRows(this._dataSource), loadingStatu: types.ListViewStatus.FINISH });
        } else if (type == types.NetStatu.ERROR) {
            this.setState({ loadingStatu: types.ListViewStatus.ERROR });
        }
    }
    _renderItem(data, rowID) {
        if (rowID == 0) {
            return this._renderFirstItem(data);
        } else if (rowID == 1 || rowID == 2) {
            return null;
        } else {
            return (
                <RankingChildItem data={data} index={rowID} />);
        }
    }

    _renderFirstItem(data) {
        return (
            <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'flex-end' }}>
                <View style={{ alignItems: 'center', flex: 1, alignSelf: 'flex-end' }}>
                    <Image style={[{ width: 20, height: 20, resizeMode: 'cover' }]} source={{ uri: 'icon_ranking_top_2' }} />
                    <View style={[{ backgroundColor: '#cad5ea', borderRadius: 15, width: 64, height: 64, justifyContent: 'center', alignItems: 'center' }]} >
                        <AndroidImage style={[styles.gameIcon, { borderRadius: 15 }]}
                            img={this._dataSource[1].icon} />
                    </View>
                    <Text style={[styles.font1_14, { marginTop: 3 }]} numberOfLines={1}>{this._dataSource[1].name}</Text>
                    <ProgressButton style={{ marginTop: 3 }} data={data} />
                </View>
                <View style={{ alignItems: 'center', flex: 1 }}>
                    <Image style={[{ width: 25, height: 25, resizeMode: 'cover' }]} source={{ uri: 'icon_ranking_top_1' }} />
                    <View style={[{ backgroundColor: '#ffeb0b', borderRadius: 15, width: 74, height: 74, justifyContent: 'center', alignItems: 'center' }]} >
                        <AndroidImage style={[styles.logoIcon, { width: 70, height: 70, borderRadius: 15 }]}
                            img={this._dataSource[0].icon} />
                    </View>
                    <Text style={[styles.font1_14, { marginTop: 3 }]} numberOfLines={1}>{this._dataSource[0].name}</Text>
                    <ProgressButton style={{ marginTop: 3 }} data={data} />
                </View>
                <View style={{ alignItems: 'center', flex: 1, alignSelf: 'flex-end' }}>
                    <Image style={[{ width: 20, height: 20, resizeMode: 'cover' }]} source={{ uri: 'icon_ranking_top_3' }} />
                    <View style={[{ backgroundColor: '#e8d2b0', borderRadius: 15, width: 64, height: 64, justifyContent: 'center', alignItems: 'center' }]} >
                        <AndroidImage style={[styles.gameIcon, { borderRadius: 15 }]}
                            img={this._dataSource[2].icon} />
                    </View>
                    <Text style={[styles.font1_14, { marginTop: 3 }]} numberOfLines={1}>{this._dataSource[2].name}</Text>
                    <ProgressButton style={{ marginTop: 3 }} data={data} />
                </View>
            </View>
        );
    }
}



