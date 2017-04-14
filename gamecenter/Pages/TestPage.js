import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../values/colors';
import fonts from '../values/fonts';
import styles from '../values/styles'
import LeftIconRightArrowItem from '../widgets/LeftIconRightArrowItem'
import { showToast } from '../tools/toast';
import AndroidImage from '../widgets/AndroidImage'
import * as GlobalConst from '../GlobalConst'
import AppToolBar from '../widgets/AppToolBar.js'
export default class MineComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <View>
                <AppToolBar titleCenter='游戏中心' navigator={this.props.navigator} />
                <Text>aaa</Text>
            </View>
        );
    }
    _onPress(index) {
        showToast(index);
    }

}
