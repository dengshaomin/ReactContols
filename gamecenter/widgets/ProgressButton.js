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
import * as types from '../values/types'
import CommonTouchableComp from './CommonTouchableComp'
let data;
export default class ProgressButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data == null) {
            data = { game_type: '', };
        } else {
            data = this.props.data;
        }
        return (
            <CommonTouchableComp onPress={() => { this.props.onPress(this.props.index) }}>
                <Text style={[this.props.style, styles.progressButton]}>{this._getButtonStr()}</Text>
            </CommonTouchableComp>
        );
    }
    _getButtonStr() {
        if (types.GameType.H5 == data.game_type) {
            return '点击即玩';
        } else if (types.GameType.READY == data.game_type) {
            return '预约';
        } else {
            return '下载';
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
