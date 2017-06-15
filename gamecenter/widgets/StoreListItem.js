import React, { Component, PropTypes } from 'react';
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
import GoodesItem from './GoodsItem.js'
export default class GoodItem extends Component {
    static propTypes = {
        dataL: PropTypes.string,
        dataR: PropTypes.string,
    }

    static defaultProps = {
    }
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.data;
        return (
            <View style={{ flexDirection: 'row', paddingLeft: 8, paddingRight: 8, paddingTop: 8, paddingBottom: 5,backgroundColor:colors.white }}>
                <GoodesItem data={this.props.dataL} style={{ flex: 1, marginRight: 2, }} />
                <GoodesItem data={this.props.dataR} style={{ flex: 1, marginLeft: 2, }} />
            </View>
        )
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
