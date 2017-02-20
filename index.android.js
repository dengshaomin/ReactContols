'use strict';

import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import DemoViewPager from './demo-viewpager'
import DemoScrollView from './demo-scrollview'
export default class ReactNative extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <DemoScrollView/>
            </View>
        )
            ;
    }

}
var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    hello: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    page: {
        flex: 1
    },
    flexStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#eeff00'
    }, flexSub: {
        width: 300,
        height: 100,
        backgroundColor: '#333333',
        marginBottom: 10,
    },
});

AppRegistry.registerComponent('reactnative', () => ReactNative);