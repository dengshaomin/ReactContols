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
import AppToolBar from '../widgets/AppToolBar.js'
import * as CardViewFactoty from '../tools/CardViewFactory.js'
import * as Screen from '../tools/Screen.js'
import CountDownTimer from 'react_native_countdowntimer'
import * as CommonAction from '../tools/common.js'
import HtmlText from 'react-native-htmltext'
import GiftTitleView from '../widgets/GiftTitleView.js'
import StoreListItem from '../widgets/StoreListItem.js'
export default class GiftComponent extends Component {
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
        this.netData = null;
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.backGround }}>
                <AppToolBar titleCenter='福利' navigator={this.props.navigator} />
                <RefreshListViewComponent dataSource={this.state.dataSource} loadingStatu={this.state.loadingStatu} renderRow={this._renderItem.bind(this)}
                    onRefresh={this._onRefresh.bind(this)} onLoadMore={this._onLoadMore.bind(this)}
                    isLoadMore={false}
                    style={{ backgroundColor: colors.white }}
                    renderSeparator={false}
                    renderHeader={this._renderHeader.bind(this)} />
            </View>
        );
    }

    _onLoadMore(pageIndex) {
        // this.currentPage = pageIndex;
        // this._request();
    }
    _onRefresh(pageIndex) {
        this.currentPage = pageIndex;
        this._request();
    }
    async _request() {
        const getPromise = GameService.getPromise('http://gamecenter.iqiyi.com/gamecenter/wf/home',
            { plugin_ver: GlobalConst.APP_VERSION, has_h5game: 'true', user_id: '', taohao: 'true' });
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
            this._dataSource.push(...json.hot_exchange);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this._dataSource), loadingStatu: types.ListViewStatus.FINISH
            });
        } else if (type == types.NetStatu.ERROR) {
            this.setState({ loadingStatu: types.ListViewStatus.ERROR });
        }
    }
    _renderHeader() {
        return (
            <View>
                {this._renderNav()}
                {this._renderActivityies()}
                {this._renderTimeLimit()}
                {this._renderCountLimit()}
                {this._renderHotExchange()}
                <GiftTitleView title='热门兑换' leftDrawable='icon_gift_hotexchange' />
            </View>
        )
    }
    _renderHotExchange() {

    }
    _renderCountLimit() {
        if (this.netData.quantity_limit == null || this.netData.quantity_limit.length == 0) return null
        return (<View style={{ backgroundColor: colors.white }}>
            <GiftTitleView title='限量兑换' leftDrawable='icon_gift_limitexchange' />
            <StoreListItem dataL={this.netData.quantity_limit[0]} dataR={this.netData.quantity_limit.length > 1 ? this.netData.quantity_limit[1] : null} />
            <View style={styles.bigSpace} />
        </View>)
    }
    _renderTimeLimit() {
        if (this.netData.time_limit == null || this.netData.time_limit.length == 0) return null;
        let data = this.netData.time_limit[0];
        return <View style={{ backgroundColor: colors.white }}>
            <View style={{ flexDirection: 'row', width: Screen.getScreenWidth(), backgroundColor: colors.white, height: 40, paddingTop: 5, paddingBottom: 5, alignItems: 'center' }}>
                <Image source={{ uri: 'icon_time_limt' }} style={{ width: Screen.getScreenWidth() * 0.8, height: 30, alignItems: 'flex-end' }} >
                    <View style={{ flexDirection: 'row', height: 30, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.font1_12}>距结束 </Text>
                            <CountDownTimer
                                //date={new Date(parseInt(data.goods_time_limit_deadline))}
                                showDay={false}
                                date={CommonAction.strToJsDate(data.goods_time_limit_deadline)}
                                days={{ plural: 'Days ', singular: 'day ' }}
                            />
                        </View>
                        <View style={{ height: 10, width: 30 }} />
                    </View>
                </Image>
            </View>
            <View style={styles.diverLine} />
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <AndroidImage style={{ flex: 1, height: (Screen.getScreenWidth() - 20) / 2 * 170 / 294 }} img={data.mobile_list_image} />
                <View style={{ flex: 1, paddingLeft: 10 }}>
                    <Text style={styles.font1_14}> {data.goods_name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }} >
                        <View style={{ flex: 1, alignSelf: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 13, color: colors.orange }}>{data.goods_enable_discount == 2 ? data.goods_discount_after_credits : data.goods_credits_need}</Text>
                                <Text style={{ fontSize: 13, color: colors.font2 }}> 金币</Text>
                            </View>
                            {data.goods_enable_discount == 2 ? <Text style={{ textDecorationLine: 'line-through', margintTop: 5, fontSize: 13, color: colors.font2 }}>{data.goods_credits_need + ' 金币'}</Text> : null}
                        </View>

                        <Text style={[styles.progressButtonBook, { fontSize: 13 }]}>立刻兑换</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bigSpace} />
        </View>
    }
    _renderNav() {
        return <View>
            <View style={{ flexDirection: 'row', backgroundColor: colors.white, paddingTop: 20, paddingBottom: 20 }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <AndroidImage style={[styles.gameIcon, { width: 40, height: 40 }]} img='icon_mall' />
                    <Text style={[styles.font1_12, { marginTop: 3 }]}>金币商城</Text>
                </View><View style={{ flex: 1, alignItems: "center" }}>
                    <AndroidImage style={[styles.gameIcon, { width: 40, height: 40 }]} img='icon_libao' />
                    <Text style={[styles.font1_12, { marginTop: 3 }]}>礼包中心</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <AndroidImage style={[styles.gameIcon, { width: 40, height: 40 }]} img='icon_huodong' />
                    <Text style={[styles.font1_12, { marginTop: 3 }]}>精彩活动</Text>
                </View>
            </View>
            <View style={styles.bigSpace} />
        </View>
    }
    _renderActivityies() {
        if (this.netData != null && this.netData.activities != null && this.netData.activities.length > 0) {
            return <View>
                <View style={{ flexDirection: 'row', backgroundColor: colors.backGround }}>
                    <View style={{ padding: 10, width: Screen.getScreenWidth() / 2, backgroundColor: colors.white }}>
                        <Text style={[styles.font1_13]}>{this.netData.activities[0].title}</Text>
                        <Text style={[styles.font2_12, { marginTop: 3 }]}>{this.netData.activities[0].desc}</Text>
                        <AndroidImage style={{ resizeMode: Image.resizeMode.contain, marginTop: 5, paddingRight: 10, width: (Screen.getScreenWidth() - 20) / 2 - 10, height: (144 / 280) * (Screen.getScreenWidth() - 20) / 2 }} img={this.netData.activities[0].pic} />
                    </View>
                    <View style={{ marginLeft: 0.5, paddingLeft: 10, backgroundColor: colors.white, width: Screen.getScreenWidth() / 2, paddingRight: 10 }}>
                        <View style={{ flex: 1, paddingBottom: 5, paddingTop: 10 }}>
                            {this.netData.activities.length > 1 && this.netData.activities[1] != null ? <View style={{ flexDirection: 'row', }}>
                                <View style={{ flex: 1, }}>
                                    <Text style={[styles.font1_13]}>{this.netData.activities[1].title}</Text>
                                    <Text style={[styles.font2_12, { marginTop: 3 }]}>{this.netData.activities[1].desc}</Text>
                                </View>
                                <AndroidImage style={{ resizeMode: Image.resizeMode.contain, marginLeft: 5, width: (Screen.getScreenWidth() - 20) / 2 * 0.4, height: (Screen.getScreenWidth() - 20) / 2 * 0.4 * 100 / 120 }} img={this.netData.activities[1].pic} />
                            </View> : null}
                        </View>
                        <View style={styles.diverLine} />
                        <View style={{ flex: 1, paddingTop: 10, paddingBottom: 5 }}>
                            {this.netData.activities.length > 2 && this.netData.activities[2] != null ?
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1, }}>
                                        <Text style={[styles.font1_13]}>{this.netData.activities[2].title}</Text>
                                        <Text style={[styles.font2_12, { marginTop: 3 }]}>{this.netData.activities[2].desc}</Text>
                                    </View>
                                    <AndroidImage style={{ resizeMode: Image.resizeMode.contain, marginLeft: 5, width: (Screen.getScreenWidth() - 20) / 2 * 0.4, height: (Screen.getScreenWidth() - 20) / 2 * 0.4 * 100 / 120 }} img={this.netData.activities[2].pic} />
                                </View> : null}
                        </View>
                    </View>
                </View>
                <View style={styles.bigSpace} />
            </View >
        }
        return null;
    }
    _renderItem(data, rowID) {
        if (rowID % 2 != 0) return (null)
        else {
            console.log(rowID)
            return (<StoreListItem dataL={data} dataR={parseInt(rowID) + 1 <= this.netData.hot_exchange.length ? this.netData.hot_exchange[parseInt(rowID) + 1] : null} />)
        }
    }

}



