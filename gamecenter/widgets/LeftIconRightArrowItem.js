import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet, Text
} from 'react-native';
import colors from '../values/colors';
import styles from '../values/styles'
import CommonTouchableComp from './CommonTouchableComp'
export default class MineComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CommonTouchableComp onPress={() => { this.props.onPress(this.props.index) } }>
                <View style={stylesthis.rootView} >
                    <Image style={styles.miniIcon} source={{ uri: this.props.leftIcon }}
                        />
                    <Text style={[styles.font1_14, { marginLeft: 10, flex: 1 }]}>{this.props.title}</Text>
                    <Image style={[styles.miniIcon]} source={{ uri: 'game_center_arrow_right' }}
                        />
                </View>
            </CommonTouchableComp>
        );
    }

}

const stylesthis = StyleSheet.create({
    rootView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:15,
        paddingBottom:15,
        backgroundColor: colors.white,
    }

});
