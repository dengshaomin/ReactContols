import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet, Text
} from 'react-native';
import colors from '../values/colors';
import styles from '../values/styles'
import fonts from '../values/fonts'
import * as types from '../values/types.js'
import CommonTouchableComp from './CommonTouchableComp'
import AndroidImage from './AndroidImage.js'
import ProgressButton from './ProgressButton.js'
let data;
export default class LongGameItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data == null) {
            data = { icon: '', cate_name: '', game_type: '', cnt: '', slogan: '', size: '', name: '', num: '' };
        } else {
            data = this.props.data;
        }
        return (
            <CommonTouchableComp onPress={() => { this.props.onPress(this.props.index) } }>
                <View style={stylesthis.rootView} >
                    <AndroidImage style={styles.gameIcon} dimg={'ppsgame_default_icon'}
                        img={data.icon}
                        />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.font1_14}>{data.name}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 3 }}>
                            <Text style={styles.tag}>{data.cate_name}</Text>
                            <Text style={[styles.font2_12, { marginLeft: 5 }]}>{this._getGameNums()}</Text>
                        </View>
                        <Text style={[styles.font2_12, { marginTop: 3 }]}>{data.slogan}</Text>
                    </View>
                    <ProgressButton style={[styles.progressButton]} data={data} />
                </View>
            </CommonTouchableComp>
        );
    }

    _getGameNums() {
        if (types.GameType.H5 == data.game_type) {
            return data.cnt + '次游玩' + " " + data.size;
        } else if (types.GameType.READY == data.game_type) {
            return data.num + '人已预约';
        } else {
            return data.cnt + '次下载' + " " + data.size;
        }
    }
}

const stylesthis = StyleSheet.create({
    rootView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.white,
    }

});
