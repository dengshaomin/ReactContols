'use strict';
import React from 'react'
import {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Dimensions,
    requireNativeComponent,
} from 'react-native';
var NativeWebView = requireNativeComponent('NativeWebView', NativeViewComponent);
export default class NativeViewComponent extends React.Component {
    render() {
        return (
            <NativeWebView url="https://www.baidu.com" style={{ flex: 1, width: 300, height: 300 }} />);
            
    }
}