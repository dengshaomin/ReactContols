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
var NativeButtonView = requireNativeComponent('NativeButtonView', NativeButtonComponent, {
    nativeOnly: { onChange: true }
});
export default class NativeButtonComponent extends React.Component {
    render() {
        return (
            <NativeButtonView  url="https://www.baidu.com" text="12345" style={{ flex: 1, width: 300, height: 300 }} onChange={(event) => {
                this.props.onClick(event);
            }} />);

    }
}