import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ListView,
    StatusBar,
    WebView,
    InteractionManager,
    ProgressBarAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../values/colors';
import fonts from '../values/fonts';
import styles from '../values/styles'
import LeftIconRightArrowItem from '../widgets/LeftIconRightArrowItem'
import { showToast } from '../tools/toast';
import AndroidImage from '../widgets/AndroidImage'
import * as GlobalConst from '../GlobalConst'
import * as Screen from '../tools/Screen.js'
import * as types from '../values/types.js'
import CommonTouchableComp from '../widgets/CommonTouchableComp.js'
import GameService from '../network/GameService.js'
import AutoHeightWebView from '../widgets/AutoHeightWebView.js'
import * as Progress from 'react-native-progress';
import ProgressBar from '../widgets/IProgressButton.js'
import ProgressButton from '../widgets/ProgressButton.js'
export default class GameDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.gameId = this.props.gameId;
        this.gameData;
        this.state = {
            message: null,
            numberOfLines: 2,
            loadingStatu: types.ListViewStatus.LOADING,
            preViewDataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),

        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {

            const getPromise = GameService.getPromise('http://gamecenter.iqiyi.com/gamecenter/game/detail',
                { id: '211036120', taohao: true, user_id: '' });
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
        });
    }
    _callback(type, json) {
        if (type == types.NetStatu.SUCCESS) {
            this.gameData = json;
            this.setState({ loadingStatu: types.ListViewStatus.SUCCESS, preViewDataSource: this.state.preViewDataSource.cloneWithRows(this.gameData.medias) });
        } else if (type == types.NetStatu.ERROR) {
            this.setState({ loadingStatu: types.ListViewStatus.ERROR });
        }
    }
    render() {
        return (
            <View style={styles.contailer}>
                <ScrollView
                    ref={(scrollView) => { _scrollView = scrollView; }}
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}
                    style={[styles.contailer, { backgroundColor: (this.gameData != null && this.gameData.background_params != null) ? this.gameData.background_params.background_color : colors.backGround }]}>
                    <AndroidImage position='absolute' style={{ width: Screen.getScreenWidth(), height: (500 / 640) * Screen.getScreenWidth() }} img={(this.gameData != null && this.gameData.background_params != null) ? this.gameData.background_params.img : null} />
                    <View style={{ marginTop: (this.gameData != null && this.gameData.background_params != null) ? -100 : -120 }}>
                        <View style={{ flexDirection: 'row', margin: 10, }}>
                            <AndroidImage position='absolute' style={styles.logoIcon} img={(this.gameData != null && this.gameData.app != null) ? this.gameData.app.icon : null} />
                            <View style={{ alignSelf: 'flex-end', marginBottom: 5, marginLeft: 15 }}>
                                <Text style={[styles.font1_14, { fontSize: 16 }]} numberOfLines={1}>
                                    {(this.gameData != null && this.gameData.app != null) ? (this.gameData.app.name + '(' + this.gameData.app.app_subname + ')') : null}
                                </Text>
                                <Text style={[styles.font2_12, { marginTop: 3 }]} numberOfLines={1}>
                                    {(this.gameData != null && this.gameData.app != null) ? this._getGameNums() : null}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.bigSpace} />
                        {this.renderPreView()}
                        {this.renderProduce()}
                    </View>
                </ScrollView>

                {this.renderTopLay()}
                {this.renderBottomLay()}
                <Text style={[styles.progressButton, styles.font1_14, { position: 'absolute', width: Screen.getScreenWidth() - 30, height: 50, margin: 15, backgroundColor: colors.green, bottom: 10 }]}>下载</Text>

            </View >
        );
    }
    onPress() {
        this.setState({
            message: "Action Completed!!"
        });
        setTimeout(() => {
            this.setState({
                message: null
            });
        }, 500);
    }
    backPress() {
        this.props.navigator.pop();
    }
    renderTopLay() {
        return (<View style={{ flexDirection: 'row', padding: 10 }} position='absolute'>
            <CommonTouchableComp onPress={this.backPress.bind(this)}>
                <Image style={[styles.buttonIcon, {}]} source={{ uri: 'icon_gdetail_back' }} />
            </CommonTouchableComp>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={[styles.buttonIcon, {}]} source={{ uri: 'icon_gdetail_search' }} />
                    <Image style={[styles.buttonIcon, { marginLeft: 20 }]} source={{ uri: 'icon_gdetail_download_normal' }} />
                </View>
            </View>
        </View>);
    }
    renderBottomLay() {

    }
    renderPreView() {
        return (<ListView
            dataSource={this.state.preViewDataSource}
            renderRow={this.renderPreViewItem.bind(this)}
            horizontal={true}
            // scrollRenderAheadDistance={500}
            removeClippedSubviews={true}
            style={{ margin: 10 }}
            showsHorizontalScrollIndicator={false}
            renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={{ width: 10 }} />}
        />
        );
    }
    renderPreViewItem(data) {
        return (<AndroidImage style={{ width: 0.38 * Screen.getScreenWidth(), height: 340 / 226 * 0.38 * Screen.getScreenWidth() }} img={data == null ? null : data.img} />);
    }
    renderProduce() {
        if (this.gameData == null || this.gameData.app == null) {
            return null;
        }
        return (<View style={{ padding: 10, marginBottom: 100 }}>
            <Text style={[styles.font1_14, { fontWeight: 'bold' }]}>"{this.gameData.app.slogan}"</Text>
            <Text style={[styles.font2_14, { marginTop: 3 }]} numberOfLines={this.state.numberOfLines}>{this.gameData.app.desc}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Text style={[styles.font2_12, {}]} numberOfLines={1}>
                    {"版本:" + this.gameData.app.version + "  更新:" + this.gameData.app.date}</Text>
                <CommonTouchableComp onPress={this.numberofLinePress.bind(this)}>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image style={[styles.miniIcon, {}]}
                            source={{ uri: this.state.numberOfLines > 2 ? 'icon_gdetail_arrowtop_dark' : 'icon_gdetail_arrowdown_dark' }}
                        />
                    </View>
                </CommonTouchableComp>
            </View>
        </View>);
    }
    numberofLinePress() {
        this.setState({ numberOfLines: this.state.numberOfLines > 2 ? 2 : 10000 });
    }
    _getGameNums() {
        if (this.gameData != null && this.gameData.app != null) {
            if (types.GameType.H5 == this.gameData.app.game_type) {
                return this.gameData.app.cate_name + '  ' + this.gameData.app.cnt + '次游玩' + '  ' + this.gameData.app.size;
            } else if (types.GameType.READY == this.gameData.app.game_type) {
                return this.gameData.app.cate_name + '  ' + this.gameData.app.num + '人已预约' + '  ' + this.gameData.app.size;
            } else {
                return this.gameData.app.cate_name + '  ' + this.gameData.app.cnt + '次下载' + '  ' + this.gameData.app.size;
            }
        }
        return null;
    }
}
