import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ListView,
    PanResponder
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
import ViewPager from 'react-native-viewpager'
import * as CardViewFactoty from '../tools/CardViewFactory.js'
export default class ChoiceComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            viewPagerdataSource: new ViewPager.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            loadingStatu: types.ListViewStatus.LOADING,
        }
        this.currentPage = 1;
        this._dataSource = new Array();
        this.type = this.props.rankingType == null ? types.RankingType.CHOICE : this.props.rankingType;
        this.netData = null;

    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.backGround }}>
                <RefreshListViewComponent dataSource={this.state.dataSource} loadingStatu={this.state.loadingStatu} renderRow={this._renderItem.bind(this)}
                    onRefresh={this._onRefresh.bind(this)} onLoadMore={this._onLoadMore.bind(this)}
                    renderHeader={this._renderHeader.bind(this)} />
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
        const getPromise = GameService.getPromise('http://gamecenter.iqiyi.com/gamecenter/home',
            { plugin_ver: GlobalConst.APP_VERSION, has_h5game: 'true', user_id: '' });
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
            this.netData = json
            this._dataSource.push(...json.cards);
            this.setState({
                title: json.title, viewPagerdataSource: this.state.viewPagerdataSource.cloneWithPages(json.focuses),
                dataSource: this.state.dataSource.cloneWithRows(this._dataSource), loadingStatu: types.ListViewStatus.FINISH
            });
        } else if (type == types.NetStatu.ERROR) {
            this.setState({ loadingStatu: types.ListViewStatus.ERROR });
        }
    }
    _renderHeader() {
        return (
            <View>
                {this._renderAdGalley(this.netData.focuses)}
                {this._renderLeftAndRight(this.netData.integratedActivity, this.netData.quality_activity.activity)}
            </View>
        )
    }
    _renderItem(data, rowID) {
        if (rowID == 7) {
            console.log(data)
        }
        return (CardViewFactoty.createView(data))
    }
    _renderLeftAndRight(datal, datar) {
        return (
            <View>
                <View style={{ flexDirection: 'row', backgroundColor: colors.diverLine }}>
                    <View style={{ flex: 1, backgroundColor: colors.white, padding: 10 }}>
                        <Text style={styles.font1_14}>{datal.moduleTitle}</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 3, alignItems: 'center' }}>
                            <AndroidImage dimg={datal.picture} style={styles.gameIcon} />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={styles.font1_13}>{datal.textTitle}</Text>
                                <Text style={styles.font2_12}>{datal.subtextTitle}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginLeft: 0.5, padding: 10, paddingLeft: 20, backgroundColor: colors.white }}>
                        <Text style={styles.font1_14}>{datar.tag}</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 3, alignItems: 'center' }}>
                            <AndroidImage dimg={datar.pic} style={styles.gameIcon} />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={styles.font1_13}>{datar.title}</Text>
                                <Text style={styles.font2_12}>{datar.desc}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.bigSpace} />
            </View>);
    }
    _renderAdGalley(data) {
        // this.state.viewPagerdataSource.cloneWithPages(data)
        return <View style={{ height: 150 }}>
            <ViewPager
                style={{ flex: 1 }}
                hasTouch={(hasTouch) => {
                    this.props.hasTouch && this.props.hasTouch(hasTouch)
                }}
                dataSource={this.state.viewPagerdataSource}
                renderPage={this._renderGalleyItem}
                isLoop={true}
                autoPlay={true} />
            <View style={styles.bigSpace} />
        </View>

    }
    _renderGalleyItem(data) {
        return <AndroidImage dimg={data.pic} style={{ flex: 1 }} />
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



