'use strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Platform,
    ToastAndroid,
} from 'react-native';

export default class TimerComponent extends React.Component {
    render() {
        this.timer1();
        this.timer2();
        return (<View style={{ flex: 1 }} />);
    }
/**这种timer不能清除，即使退出页面 console.log(1) 照样执行*/
    timer1() {
        setTimeout(function () {
            console.log(2);
        }, 3000);
    }
    /**这种timer能清除，在生命周期结束时清除，退出页面 console.log(2) 不执行*/
    timer2() {
        this.timer = setTimeout(function () {
            console.log(2);
        }, 3000);
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
}