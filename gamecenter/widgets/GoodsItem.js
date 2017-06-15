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
export default class GoodItem extends Component {
    static propTypes = {
        data: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
    }

    static defaultProps = {
        leftDrawable: 'icon_gift_limitexchange',
        title: '我是标题',
        width: (Screen.getScreenWidth() - 24) / 2,
        height: (Screen.getScreenWidth() - 24) / 2 * 170 / 294,
    }
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.data;
        let tagDrawable;
        let tagName;
        if (data != null) {
            if (data.goods_tag == 1) {
                tagName = 'VIP专享';
                tagDrawable = 'icon_store_vip';
            } else if (data.goods_tag == 2) {
                tagName = 'VIP折扣';
                tagDrawable = 'icon_store_vip_discount';
            } else if (data.goods_tag == 3) {
                tagName = '爆款';
                tagDrawable = 'icon_baokuan';
            } else {
                tag = -1;
            }
        }
        return (
            data = null ? null :
                <View style={{ flex: 1, }}>
                    <View style={{ padding: 5 }}>
                        <Image style={{ alignItems: 'flex-end', backgroundColor: colors.white, borderWidth: 0.5, borderColor: colors.diverLine, width: this.props.width, height: this.props.height, resizeMode: Image.resizeMode.contain, alignSelf: 'center' }}
                            source={{ uri: this.props.data == null ? null : this.props.data.mobile_list_image }}
                        >
                            {tagName == -1 ? null : <Image style={{ resizeMode: Image.resizeMode.contain, alignItems: 'center' }} source={{ uri: tagDrawable }} >
                                <Text style={{ paddingTop: 1, paddingBottom: 1, paddingLeft: 5, paddingRight: 5, color: colors.white, backgroundColor: tagDrawable, fontSize: fonts.font10, alignSelf: 'center' }}>{tagName}</Text>
                            </Image>}
                        </Image>
                        <View style={{ paddingLeft: 10 }} >
                            <Text style={[styles.font1_13, { marginTop: 5, }]} numberOfLines={1}>{this.props.data.goods_name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 12, color: colors.orange, marginTop: 5 }}>{'金币: ' + (data.goods_enable_discount == 2 ? data.goods_discount_after_credits : data.goods_credits_need)}</Text>
                                {data.goods_enable_discount == 2 ? <Text style={{ fontSize: 12, color: colors.font3, marginTop: 5, marginLeft: 5, textDecorationLine: 'line-through' }}>{data.goods_credits_need}</Text> : null}
                            </View>
                        </View>
                    </View>
                </View >
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
