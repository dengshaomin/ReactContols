import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../values/colors';
import fonts from '../values/fonts';
import styles from '../values/styles'
import LeftIconRightArrowItem from '../widgets/LeftIconRightArrowItem'
import { showToast } from '../tools/toast';
import AndroidImage from '../widgets/AndroidImage'
import * as GlobalConst from '../GlobalConst'
export default class MineComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <ScrollView
                ref={(scrollView) => { _scrollView = scrollView; } }
                automaticallyAdjustContentInsets={false}
                onScroll={() => { console.log('onScroll!'); } }
                scrollEventThrottle={200}
                style={styles.contailer}>
                <View style={{ flexDirection: 'column', backgroundColor: colors.white }}>
                    <Image style={{ height: 150 }} source={{ uri: "my_top_bg" }} />
                    <View style={{ flexDirection: 'column', paddingLeft: 110, paddingTop: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.font1_13}>nothing!1</Text>
                            <Image source={{ uri: 'my_lv_bg' }} style={{ marginLeft: 5, resizeMode: Image.resizeMode.contain, padding: 5 }}>
                                <Text style={[styles.font1_10]}>LV4</Text>
                            </Image>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                            <Image source={{ uri: 'my_coin' }} style={{ height: 16, width: 16, resizeMode: Image.resizeMode.contain }} />
                            <Text style={[styles.font1_13, { marginLeft: 5 }]}>金币:</Text>
                            <Text style={{ marginLeft: 5, fontSize: fonts.font13, color: colors.red }}>220</Text>
                        </View>
                    </View>
                    <AndroidImage style={[styles.logoIcon, { marginLeft: 10, marginTop: -70, marginBottom: 15 }]} dimg={'logo_default'}
                        img={'11'} />
                </View>
                <View style={styles.bigSpace} />
                <LeftIconRightArrowItem leftIcon='icon_task' title='任务中心' index='0' onPress={this._onPress.bind(this)} />
                <View style={styles.bigSpace} />
                <LeftIconRightArrowItem leftIcon='btn_mygame_me' title='我的游戏' index='1' onPress={this._onPress.bind(this)} />
                <View style={styles.diverLine} />
                <LeftIconRightArrowItem leftIcon='icon_libao' title='我的礼包' index='2' onPress={this._onPress.bind(this)} />
                <View style={styles.diverLine} />
                <LeftIconRightArrowItem leftIcon='btn_coinmall' title='我的背包' index='3' onPress={this._onPress.bind(this)} />
                <View style={styles.bigSpace} />
                <LeftIconRightArrowItem leftIcon='btn_introduce' title='我的消息' index='4' onPress={this._onPress.bind(this)} />
                <View style={styles.diverLine} />
                <LeftIconRightArrowItem leftIcon='btn_customeservie' title='联系客服' index='5' onPress={this._onPress.bind(this)} />
                <Text style={{ flex: 1, fontSize: fonts.font11, color: colors.font3, marginTop: 15, textAlign: 'center', marginBottom: 30 }}>爱奇艺游戏中心{GlobalConst.APP_VERSION}   RN</Text>
            </ScrollView>
        );
    }
    _onPress(index) {
        console.log(11);
        showToast(index);
    }

}
