import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet, Text,
    ToolbarAndroid,
} from 'react-native';
import colors from '../values/colors';
import styles from '../values/styles'
import fonts from '../values/fonts'
import * as types from '../values/types.js'
import CommonTouchableComp from './CommonTouchableComp'
import AndroidImage from './AndroidImage.js'
import * as Screen from '../tools/Screen.js'
import * as GlobalConst from '../GlobalConst.js'
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
            <View >

                <ToolbarAndroid
                    toolbarActions={this.props.toolbarActions}
                    navIcon={{ uri: 'ppsgame_actionbar_back_pressed' }}
                    style={styles.toolBar}
                    onIconClicked={this.backClick.bind(this)}
                >

                </ToolbarAndroid>
                <Text style={{ backgroundColor: colors.translate, width: Screen.getScreenWidth(), textAlign: 'center', fontSize: 18, color: colors.font1, position: 'absolute', top: 15 }}>
                    {this.props.titleCenter}
                </Text>

            </View >
        );
    }
    backClick() {
        this.props.navigator.pop();
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
