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
import CommonTouchableComp from './CommonTouchableComp'
import AndroidImage from './AndroidImage.js'
export default class MineComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.source == null || this.props.source.uri == null) {
            // console.log(6);
            // this.props.source = { uri: 'ppsgame_default_icon' };
        }
        return (
            <CommonTouchableComp onPress={() => { this.props.onPress(this.props.index) } }>
                <View style={stylesthis.rootView} >
                    <AndroidImage style={styles.gameIcon} defaultSource={{ uri: 'ppsgame_default_icon' }} source={this.props.source}
                        />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.font1_14}>天龙八部</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.tag}>天龙八部</Text>
                        </View>

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
        padding: 10,
        backgroundColor: colors.white,
    }

});
