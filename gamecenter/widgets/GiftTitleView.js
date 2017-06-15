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
let data;
export default class GiftTitleView extends Component {
    static propTypes = {
        leftDrawable: PropTypes.string,
        title: PropTypes.string
    }

    static defaultProps = {
        leftDrawable: 'icon_gift_limitexchange',
        title: '我是标题'
    }
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
            <View>
                <View style={{ backgroundColor: colors.white, height: 40, flexDirection: 'row', alignItems: 'center' }}>
                    <AndroidImage style={{ width: 5, height: 18 }}
                        img={this.props.leftDrawable}
                    />
                    <Text style={[styles.font1_14, { marginLeft: 5 }]}>{this.props.title}</Text>
                </View>
                <View style={styles.diverLine} />
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
