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
import AndroidImage from './AndroidImage.js'
export default class MineComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CommonTouchableComp onPress={() => { this.props.onPress(this.props.index) } }>
                <View style={stylesthis.rootView} >
                    <AndroidImage style={styles.gameIcon} source={{ uri: 'logo_default' }}
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
        padding: 10,
        backgroundColor: colors.white,
    }

});
