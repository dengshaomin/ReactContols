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
import * as Screen from '../tools/Screen.js'
let data;
export default class CategoryItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data == null) {
            data = { picture: '', name: '', total: '' };
        } else {
            data = this.props.data;
        }
        return (
            <CommonTouchableComp onPress={() => { this.props.onPress == null ? null : this.props.onPress(data,this.props.index) } }>
                <View style={stylesthis.rootView} >
                    <AndroidImage style={styles.gameIcon} dimg={'ppsgame_default_icon'}
                        img={data.picture}
                        />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.font1_14}>{data.name}</Text>
                        <Text style={[styles.font2_10, { marginTop: 10 }]}>共有{data.total}款游戏</Text>
                    </View>
                </View>
            </CommonTouchableComp>
        );
    }
}

const stylesthis = StyleSheet.create({
    rootView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: Screen.getScreenWidth() / 2,
        padding: 10,
        backgroundColor: colors.white,
        borderWidth: 0.2,
        borderColor: colors.diverLine
    }

});
