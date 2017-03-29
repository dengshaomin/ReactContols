import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import { showToast } from '../tools/toast';
import * as COLOR from '../values/color'
export default class BaseComponent extends Component {
    constructor(props) {
        super(props);
    }
}
var styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.COLOR.backGround,
        flex: 1,
    }
});
