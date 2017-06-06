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
export default class CategoryItem extends Component {
    static propTypes = {
        txt: PropTypes.string,
    }
    static defaultProps = {
        txt: '查看更多',
    }
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <View style={styles.diverLine} />
                <View style={{ flexDirection: 'row', backgroundColor: colors.white, alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ color: colors.green, fontSize: fonts.font14, paddingTop: 12, paddingBottom: 12 }}>{this.props.txt}</Text>
                    <AndroidImage style={[styles.miniIcon, { width: 25, height: 25, resizeMode: Image.resizeMode.stretch }]} img='phone_my_inc_arrow' />
                </View>
            </View>
        );
    }
}

